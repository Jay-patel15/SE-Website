import Image from "next/image";
import { Award, CheckCircle2, ShieldCheck, Target } from "lucide-react";
import { CtaBand } from "@/components/common/CtaBand";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { brand, certifications, stats } from "@/constants/site";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo(
  "About Us",
  "Siddhi Electricals is a Government licensed electrical contractor in Mumbai delivering safe, compliant HT/LT installations, utility approvals and maintenance since 2015.",
  "/about"
);

const values = [
  { title: "Safety first", desc: "Approved PPE, tools and IE Rules compliance on every site, every day.", icon: ShieldCheck },
  { title: "Engineering precision", desc: "Load calculations, IS codes and checklists followed to the letter.", icon: Target },
  { title: "Built to last", desc: "Panels, cabling and systems designed with future load expansion in mind.", icon: Award }
];

const safetyStandards = [
  "Full adherence to Indian Electricity (IE) Rules & Regulations",
  "Insulated gloves, boots and helmets mandatory for all site engineers",
  "Insulation resistance & earth resistance testing before commissioning",
  "Double earthing for HT/LT panels and generator sets",
  "Tool-box safety talks before every major shutdown"
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }]}
        eyebrow="About us"
        title="Licensed electrical contracting with practical engineering"
        description={`${brand.name} supports clients from load calculations and planning through cabling, panels, utility approvals and maintenance handover.`}
      />

      <section className="band band-white">
        <div className="container split">
          <div>
            <SectionHeader
              eyebrow="Who we are"
              title="A Mumbai team you can trust with your power"
              description="We are a Government licensed electrical contractor working across industrial plants, commercial buildings and homes. Every project gets disciplined engineering, tidy wiring and a complete documentation file that stands up to utility inspection."
            />
            <div className="grid" style={{ gap: 16, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <strong style={{ display: "block", fontSize: "1.8rem", color: "var(--primary)", fontWeight: 800 }}>{s.value}</strong>
                  <span style={{ color: "var(--muted)", fontWeight: 600 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="image-frame wide">
            <Image
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
              alt="Siddhi Electricals engineer testing an electrical installation"
              fill
              sizes="(max-width: 720px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <SectionHeader center eyebrow="Our values" title="What we stand for" />
          <div className="grid grid-3 trio">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div className="card" key={v.title} style={{ display: "grid", gap: 12 }}>
                  <span className="icon-badge"><Icon size={24} /></span>
                  <h3 style={{ fontSize: "1.15rem" }}>{v.title}</h3>
                  <p style={{ color: "var(--text)" }}>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="band dark-band">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <SectionHeader eyebrow="Compliance" title="Licensed & certified" description="We hold the licensing required for both low-tension (LT) and high-tension (HT) electrical contracting." />
            <div style={{ display: "grid", gap: 12 }}>
              {certifications.map((cert) => {
                const Icon = cert.icon;
                return (
                  <div className="card" key={cert.title} style={{ padding: 18, display: "flex", gap: 14, alignItems: "center" }}>
                    <Icon size={22} color="var(--accent)" />
                    <span style={{ fontWeight: 700 }}>{cert.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: "1.3rem", marginBottom: 20 }}>Safety guidelines on every site</h3>
            <ul className="check-list">
              {safetyStandards.map((s) => (
                <li key={s} style={{ color: "rgba(255,255,255,0.85)" }}><CheckCircle2 size={18} color="var(--accent)" /> {s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
