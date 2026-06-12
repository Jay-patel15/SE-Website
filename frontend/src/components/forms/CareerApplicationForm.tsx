"use client";

import { useState } from "react";

export function CareerApplicationForm() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitted");
    event.currentTarget.reset();
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Apply Online</h2>
      <div className="form-grid">
        <input className="input" name="name" placeholder="Full name" required />
        <input className="input" name="phone" placeholder="Phone" required />
        <input className="input" name="email" placeholder="Email" type="email" />
        <select className="select" name="role" defaultValue="" required>
          <option value="" disabled>Position</option>
          <option>Electrical Site Supervisor</option>
          <option>Electrician</option>
          <option>Back Office Coordinator</option>
        </select>
      </div>
      <textarea className="textarea" name="experience" placeholder="Experience, certifications, and availability" style={{ marginTop: 14 }} />
      <button className="btn btn-primary" type="submit" style={{ marginTop: 14 }}>Submit Application</button>
      {status === "submitted" ? <p className="status ok">Application captured. Resume upload can be connected to Supabase Storage.</p> : null}
    </form>
  );
}
