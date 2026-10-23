"use client";

import { useState } from "react";
import { isSupabaseActive, saveLead } from "@/lib/dataClient";
import { services } from "@/constants/site";

// Client-side limits mirror the server schema in app/api/leads/route.ts for UX only;
// the server is the security boundary and re-validates everything.
export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const options = services.map((s) => s.title);
  const initial = options.includes(defaultService) ? defaultService : "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error);

      // Demo mode only (no Supabase): keep a local copy so the admin panel in this browser shows it.
      // With Supabase, the server already stored the lead; the browser never writes leads directly.
      if (!isSupabaseActive()) {
        const { website, ...lead } = payload;
        await saveLead(lead);
      }

      form.reset();
      setStatus("success");
      setMessage("Thank you! Our team will contact you shortly.");
    } catch (e) {
      setStatus("error");
      // Only show messages the server chose to expose; network errors get a generic message
      const serverMessage = e instanceof TypeError ? "" : (e as Error).message;
      setMessage(serverMessage || "Something went wrong. Please check your details or call us directly.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">Name *<input className="input" name="name" autoComplete="name" required minLength={2} maxLength={80} /></label>
        <label className="field">Phone *<input className="input" name="phone" type="tel" autoComplete="tel" required minLength={8} maxLength={20} /></label>
        <label className="field">Email<input className="input" name="email" type="email" autoComplete="email" maxLength={254} /></label>
        <label className="field">
          Service *
          <select className="select" name="service" defaultValue={initial} required>
            <option value="" disabled>Select a service</option>
            {options.map((s) => <option key={s}>{s}</option>)}
            <option>Other</option>
          </select>
        </label>
        <label className="field full-span">Project location<input className="input" name="location" maxLength={120} placeholder="e.g. Andheri East, Mumbai" /></label>
        <label className="field full-span">
          Project details *
          <textarea className="textarea" name="message" placeholder="Site type, approximate load, meter requirement or timeline" required minLength={5} maxLength={2000} />
        </label>
        {/* Honeypot: hidden from people and screen readers; bots that fill it are silently dropped */}
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
      </div>
      <button className="btn btn-primary" type="submit" style={{ marginTop: 20, width: "100%" }} disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Enquiry"}
      </button>
      {message ? <p className={`status ${status === "success" ? "ok" : "error"}`} role="status">{message}</p> : null}
    </form>
  );
}
