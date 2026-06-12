import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CareerApplicationForm } from "@/components/forms/CareerApplicationForm";
import { pageSeo } from "@/lib/seo";
import { Briefcase, MapPin, Clock, Award, Upload } from "lucide-react";

export const metadata = pageSeo(
  "Careers",
  "Join the engineering and technician team at Siddhi Electricals. Browse open positions for site supervisors, licensed electricians, and liaison officers in Mumbai."
);

export default function CareersPage() {
  const jobs = [
    {
      title: "Electrical Site Supervisor",
      type: "Full-time",
      location: "Mumbai",
      exp: "3+ Years",
      desc: "Supervise commercial and industrial installations. Manage site layout execution, verify safety checklist adherence, and coordinate with client facilities teams.",
      reqs: ["Degree/Diploma in Electrical Engineering", "Class-A supervisor license preferred", "Familiar with HT/LT panel drawings"]
    },
    {
      title: "Licensed Electrician",
      type: "Full-time",
      location: "Mumbai",
      exp: "2+ Years",
      desc: "Perform wiring, terminal crimping, busbar setup, and earthing pit testing. Ensure zero wiring faults and follow standard IS safety codes.",
      reqs: ["ITI Electrician course certificate", "Valid PWD wiring license", "Experience with industrial cable trays"]
    },
    {
      title: "Liaison & Office Coordinator",
      type: "Full-time",
      location: "Mumbai",
      exp: "1+ Years",
      desc: "Coordinate utility meter passing paperwork for Adani Electricity, Tata Power, and BEST. Audit contractor reports and submit file clearances.",
      reqs: ["Graduate with good communication skills", "Basic knowledge of utility forms & NOC documentation", "Organized and detail-oriented"]
    }
  ];

  return (
    <>
      <PageHero
        eyebrow="Join Our Team"
        title="Build Reliable Electrical Infrastructure With Us"
        description="Explore career opportunities at Siddhi Electricals. We seek dedicated, licensed technicians and detail-oriented coordinators to power challenging sites."
      />

      <section className="band">
        <div className="container split" style={{ alignItems: "start" }}>
          {/* Open Positions */}
          <div>
            <SectionHeader eyebrow="Open Positions" title="Current Openings" />
            <div style={{ display: "grid", gap: 20, marginTop: 24 }}>
              {jobs.map((job) => (
                <div className="card" key={job.title}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                    <h3 style={{ margin: 0, fontSize: "1.3rem" }}>{job.title}</h3>
                    <span className="pill" style={{ fontSize: "0.75rem", padding: "4px 10px" }}>{job.type}</span>
                  </div>
                  
                  <div style={{ display: "flex", gap: 16, fontSize: "0.85rem", color: "#8c9794", fontWeight: 700, margin: "10px 0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={14} color="var(--primary)" /> {job.location}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={14} color="var(--primary)" /> Exp: {job.exp}
                    </span>
                  </div>

                  <p style={{ color: "#4c5754", fontSize: "0.95rem", lineHeight: 1.5, marginBottom: 14 }}>
                    {job.desc}
                  </p>

                  <div style={{ borderTop: "1px solid #eaeaea", paddingTop: 14 }}>
                    <h4 style={{ margin: "0 0 8px 0", fontSize: "0.9rem", color: "#1a1a1a" }}>Requirements:</h4>
                    <ul style={{ paddingLeft: 18, margin: 0, fontSize: "0.85rem", color: "#4c5754", display: "grid", gap: 4 }}>
                      {job.reqs.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <aside style={{ position: "sticky", top: 110 }}>
            <CareerApplicationForm />
            
            {/* Resume Upload Visual Placeholder */}
            <div className="glass" style={{ padding: 22, marginTop: 20, textAlign: "center" }}>
              <Upload size={32} color="var(--primary)" style={{ margin: "0 auto 10px" }} />
              <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem" }}>Storage Vault Ready</h4>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#4c5754", lineHeight: 1.4 }}>
                Our database is prepared for secure PDF resume uploads linked to Supabase Storage.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
