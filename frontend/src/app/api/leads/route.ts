import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional(),
  service: z.string().min(2),
  message: z.string().min(5)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid lead payload", details: parsed.error.flatten() }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message: "Lead accepted. Connect getSupabaseAdminClient() to persist contact_leads."
  });
}
