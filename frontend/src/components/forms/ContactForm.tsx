"use client";

import { useState } from "react";
import { saveLead } from "@/lib/dataClient";
import { services } from "@/constants/site";

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
      if (!response.ok) throw new Error("Unable to submit inquiry");

      await saveLead({
        name: payload.name,
        phone: payload.phone,
        email: payload.email || "",
        service: payload.service,
        location: payload.location || "",
        message: payload.message
      });

      form.reset();
      setStatus("success");
      setMessage("Thank you! Our team will contact you shortly.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please check your details or call us directly.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">Name *<input className="input" name="name" autoComplete="name" required minLength={2} /></label>
        <label className="field">Phone *<input className="input" name="phone" type="tel" autoComplete="tel" required minLength={8} /></label>
        <label className="field">Email<input className="input" name="email" type="email" autoComplete="email" /></label>
        <label className="field">
          Service *
          <select className="select" name="service" defaultValue={initial} required>
            <option value="" disabled>Select a service</option>
            {options.map((s) => <option key={s}>{s}</option>)}
            <option>Other</option>
          </select>
        </label>
        <label className="field full-span">Project location<input className="input" name="location" placeholder="e.g. Andheri East, Mumbai" /></label>
        <label className="field full-span">
          Project details *
          <textarea className="textarea" name="message" placeholder="Site type, approximate load, meter requirement or timeline" required minLength={5} />
        </label>
      </div>
      <button className="btn btn-primary" type="submit" style={{ marginTop: 20, width: "100%" }} disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Enquiry"}
      </button>
      {message ? <p className={`status ${status === "success" ? "ok" : "error"}`} role="status">{message}</p> : null}
    </form>
  );
}
