"use client";

import { useState } from "react";

const services = ["Electrical Contracting", "Electrical Consultancy", "Meter Passing", "Electrical Panels", "CCTV", "Home Automation", "Energy Management"];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Unable to submit inquiry");
      }

      form.reset();
      setStatus("success");
      setMessage("Inquiry received. Siddhi Electricals will contact you shortly.");
    } catch {
      setStatus("error");
      setMessage("Please check the details and try again.");
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <input className="input" name="name" placeholder="Name" required minLength={2} />
        <input className="input" name="phone" placeholder="Phone" required minLength={8} />
        <input className="input" name="email" placeholder="Email" type="email" />
        <select className="select" name="service" defaultValue="" required>
          <option value="" disabled>Service required</option>
          {services.map((service) => <option key={service}>{service}</option>)}
        </select>
        <input className="input full-span" name="location" placeholder="Project location" />
      </div>
      <textarea className="textarea" name="message" placeholder="Project details, load, meter requirement, or site timeline" required minLength={5} style={{ marginTop: 14 }} />
      <button className="btn btn-primary" type="submit" style={{ marginTop: 14 }} disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit Inquiry"}
      </button>
      {message ? <p className={`status ${status === "success" ? "ok" : "error"}`}>{message}</p> : null}
    </form>
  );
}
