import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { JsonLd } from "@/components/common/JsonLd";
import { brand, certifications } from "@/constants/site";
import { pageSeo } from "@/lib/seo";
import { ShieldAlert, Award, FileSpreadsheet, Briefcase, Zap } from "lucide-react";

export const metadata = pageSeo(
  "About Siddhi Electricals",
  "Company profile, mission, vision, values, milestones, certifications, and high safety standards of Siddhi Electricals."
);

export default function AboutPage() {
  const values = [
    { title: "Safety First", desc: "No compromises on site safety. Every technician uses approved PPE and tools." },
    { title: "Engineering Precision", desc: "We follow IS codes and electrical compliance checklists to the letter." },
    { title: "Liaisoning Capability", desc: "Strong understanding of utility norms for Adani, Tata Power, and BEST." },
    { title: "Long-Term Reliability", desc: "We design panels, cabling, and systems with future load expansion in mind." },
    { title: "Transparent Pricing", desc: "Detailed bill of quantities (BOQ) and timelines with no hidden costs." },
    { title: "24/7 Response", desc: "Dedicated support team for critical shutdowns and emergency maintenance." }
  ];

  const milestones = [
    { year: "2015", title: "Establishment", desc: "Founded in Mumbai, offering residential and commercial wiring support." },
    { year: "2018", title: "Government Licensing", desc: "Secured Class-A Electrical Contractor license for high-voltage systems." },
    { year: "2021", title: "Industrial Pivot", desc: "Started executing heavy turnkey panel installations and factory setups." },
    { year: "2024", title: "Liaisoning Leadership", desc: "Successfully facilitated 100+ new high-load meter connections and audits." },
    { year: "2026", title: "Modern Automation & IoT", desc: "Integrating smart home automation and large-scale CCTV surveillance setups." }
  ];

  const safetyStandards = [
    "100% adherence to Indian Electricity (IE) Rules & Regulations",
    "Mandatory insulated safety gloves, boots, and helmets for all site engineers",
    "Pre-commissioning tests including insulation resistance & earth resistance testing",
    "Double earthing protocols for HT/LT panels and generator sets",
    "Regular mock drills and safety tool-box talks before every major shutdown"
  ];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": brand.name,
      "description": brand.tagline,
      "address": brand.address,
      "telephone": brand.phone,
      "email": brand.email
    }
  };

  return (
    <>
      <JsonLd data={aboutSchema} />

      <PageHero
        eyebrow="Who We Are"
        title="Licensed Electrical Contracting with Practical Engineering"
        description="Siddhi Electricals supports clients from initial load calculations and planning, through physical cabling, panel fabrication, utility passing, and maintenance handovers."
      />

      {/* Mission / Vision / Message Grid */}
      <section className="band" style={{ background: "#ffffff" }}>
        <div className="container">
          <div className="grid grid-3">
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Zap color="#0d7b5f" size={28} />
              <h2 style={{ margin: 0, fontSize: "1.4rem" }}>Our Mission</h2>
              <p style={{ color: "#4c5754", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                Deliver robust, energy-efficient, and compliant electrical systems. We prioritize structured schedules, zero-accident environments, and transparent customer communications.
              </p>
            </div>
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Award color="#0d7b5f" size={28} />
              <h2 style={{ margin: 0, fontSize: "1.4rem" }}>Our Vision</h2>
              <p style={{ color: "#4c5754", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                Establish Siddhi Electricals as Mumbai's leading electrical partner for complex industrial plants, smart buildings, and critical grid connections.
              </p>
            </div>
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <FileSpreadsheet color="#0d7b5f" size={28} />
              <h2 style={{ margin: 0, fontSize: "1.4rem" }}>Director Message</h2>
              <p style={{ color: "#4c5754", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                &ldquo;Every project deserves disciplined engineering, tidy wiring, and a detailed documentation folder that stands up to inspectoral scrutiny from utilities.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="band" style={{ background: "#f8f8f8" }}>
        <div className="container">
          <SectionHeader eyebrow="Values" title="Our Standards of Delivery" />
          <div className="grid grid-3" style={{ marginTop: 24 }}>
            {values.map((v) => (
              <div className="glass" key={v.title} style={{ padding: 22 }}>
                <h3 style={{ color: "#0d7b5f", margin: "0 0 8px 0" }}>{v.title}</h3>
                <p style={{ color: "#4c5754", fontSize: "0.9rem", lineHeight: 1.5, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Milestones Section */}
      <section className="band" style={{ background: "#ffffff" }}>
        <div className="container">
          <SectionHeader eyebrow="Our Journey" title="Milestones of Growth" />
          <div className="timeline" style={{ marginTop: 40 }}>
            {milestones.map((milestone) => (
              <div className="timeline-item" key={milestone.year}>
                <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "#f7931e", display: "block", marginBottom: 4 }}>
                  {milestone.year}
                </span>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "1.25rem" }}>{milestone.title}</h3>
                <p style={{ color: "#4c5754", fontSize: "0.95rem", lineHeight: 1.5, margin: 0 }}>{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Safety Standards Grid */}
      <section className="band dark-band">
        <div className="container grid grid-2" style={{ gap: 40, alignItems: "start" }}>
          <div>
            <SectionHeader
              eyebrow="Compliance"
              title="Licensed &amp; Certified"
              description="We maintain the licensing required to handle both low-tension (LT) and high-tension (HT) electrical contracting."
            />
            <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
              {certifications.map((cert) => {
                const Icon = cert.icon;
                return (
                  <div className="glass" key={cert.title} style={{ padding: 18, display: "flex", gap: 14, alignItems: "center" }}>
                    <Icon size={24} color="#f7931e" style={{ flexShrink: 0 }} />
                    <h4 style={{ margin: 0, color: "white", fontSize: "1.1rem" }}>{cert.title}</h4>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass" style={{ padding: 30 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
              <ShieldAlert size={28} color="#f7931e" />
              <h3 style={{ margin: 0, color: "white", fontSize: "1.5rem" }}>Safety First Guidelines</h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, color: "#d9eee7", display: "grid", gap: 12, lineHeight: 1.6 }}>
              {safetyStandards.map((std, idx) => (
                <li key={idx} style={{ fontSize: "0.95rem" }}>{std}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
