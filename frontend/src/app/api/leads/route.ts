import { NextResponse } from "next/server";
import { z } from "zod";
import { services } from "@/constants/site";
import { getSupabaseAdminClient } from "@/lib/supabase";

/*
 * Public contact-form endpoint. Threats and mitigations:
 *  - Injection / oversized payloads → strict zod schema with max lengths, whitelisted service, 10 KB body cap
 *  - CSRF / cross-site abuse        → Origin must match this host (browsers always send Origin on POST)
 *  - Spam bots / flooding           → honeypot field + per-IP rate limit
 *  - Information disclosure          → generic error messages only; details stay in server logs
 *  - Data exposure                   → response never echoes stored data; PII is masked in logs
 * Leads are written server-side with the service-role key (never shipped to the browser), so the
 * contact_leads table needs NO public insert policy.
 */

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT = 5; // submissions
const RATE_WINDOW_MS = 10 * 60_000; // per 10 minutes per IP

const allowedServices: [string, ...string[]] = ["Other", ...services.map((s) => s.title)];

const leadSchema = z
  .object({
    name: z.string().trim().min(2).max(80).regex(/^[\p{L}\p{M}\s.'-]+$/u, "invalid name"),
    phone: z
      .string()
      .trim()
      .max(20)
      .regex(/^\+?[\d\s()-]+$/, "invalid phone")
      .refine((v) => v.replace(/\D/g, "").length >= 8, "invalid phone"),
    email: z.union([z.literal(""), z.string().trim().max(254).email()]).optional(),
    service: z.enum(allowedServices),
    location: z.string().trim().max(120).optional(),
    message: z.string().trim().min(5).max(2000),
    website: z.string().max(200).optional() // honeypot: real users never see or fill this
  })
  .strict();

// ponytail: in-memory limiter is per server instance (resets on deploy / not shared across serverless
// instances). Move to Upstash Redis or Vercel KV if spam gets through.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 10_000) hits.clear(); // bound memory under a flood
  return recent.length > RATE_LIMIT;
}

const fail = (status: number, error: string) => NextResponse.json({ error }, { status });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const sameOrigin = (() => {
    try {
      return !!origin && !!host && new URL(origin).host === host;
    } catch {
      return false; // e.g. Origin: null from sandboxed frames
    }
  })();
  if (!sameOrigin) return fail(403, "Forbidden");

  if (!request.headers.get("content-type")?.startsWith("application/json")) return fail(415, "Unsupported content type");

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return fail(429, "Too many requests. Please try again later or call us.");

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return fail(413, "Request too large");

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, "Invalid request");
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return fail(400, "Please check your details and try again.");

  const { website, ...lead } = parsed.data;
  // Bots that fill the honeypot get a fake success so they don't retry
  if (website) return NextResponse.json({ ok: true });

  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { error } = await getSupabaseAdminClient()
      .from("contact_leads")
      .insert({ ...lead, email: lead.email || null, location: lead.location || null });
    if (error) {
      console.error("[leads] insert failed", error.code, error.message);
      return fail(500, "Something went wrong. Please call us directly.");
    }
  }

  // Audit log without PII: service + masked phone only
  console.info("[leads] accepted", { service: lead.service, phone: `***${lead.phone.replace(/\D/g, "").slice(-3)}` });
  return NextResponse.json({ ok: true });
}
