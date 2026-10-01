import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone, ShieldCheck } from "lucide-react";
import { CtaBand } from "@/components/common/CtaBand";
import { JsonLd } from "@/components/common/JsonLd";
import { SectionHeader } from "@/components/common/SectionHeader";
import { brand, differentiators, faqs, projects, services, stats } from "@/constants/site";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo(
  brand.name,
  "Government licensed electrical contractor in Mumbai. HT/LT installations, Adani, Tata Power and BEST meter passing, electrical panels, CCTV and home automation for industrial, commercial and residential sites."
);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema} />

      <section className="hero">
        <Image
          className="hero-bg"
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1800&q=80"
          alt="Licensed electrician working on a distribution board"
          fill
          priority
          sizes="100vw"
        />
        <div className="container">
          <span className="eyebrow">Licensed Electrical Contractor · Mumbai</span>
          <h1>Safe, reliable electrical work, <span>done right the first time.</span></h1>
          <p className="lead">
            Siddhi Electricals designs, installs and certifies electrical systems for factories, offices and homes, and handles Adani, Tata Power and BEST meter approvals end to end.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-secondary" href="/contact">Get a Free Quote <ArrowRight size={18} /></Link>
            <a className="btn btn-light" href={`tel:${brand.phone.replaceAll(" ", "")}`}><Phone size={16} /> {brand.phone}</a>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="band">
        <div className="container">
          <SectionHeader center eyebrow="What we do" title="Electrical services from design to commissioning" description="One licensed team for planning, installation, utility approvals and maintenance." />
          <div className="grid grid-3">
            {services.slice(0, 6).map((service) => {
              return (
                <Link className="card media-card" href={`/services/${service.slug}`} key={service.slug}>
                  <div className="media">
                    <Image src={service.image} alt={service.title} fill sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 33vw" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="media-card-body">
                    <h3 style={{ fontSize: "1.2rem" }}>{service.title}</h3>
                    <p style={{ color: "var(--text)" }}>{service.summary}</p>
                    <span className="link-arrow" style={{ marginTop: "auto" }}>Learn more <ArrowRight size={16} /></span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link className="btn btn-ghost" href="/services">View all services <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="band band-white">
        <div className="container split">
          <div className="image-frame">
            <Image
              src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1000&q=80"
              alt="Neatly wired LT distribution panel installed by Siddhi Electricals"
              fill
              sizes="(max-width: 720px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            <div className="image-badge">
              <span className="icon-badge orange" style={{ width: 42, height: 42 }}><ShieldCheck size={22} /></span>
              Safety-first execution
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Why Siddhi Electricals" title="Engineering discipline on every site" description="We plan the load, use IS-certified material, test everything and hand over complete documentation, so your installation passes inspection and runs for years." />
            <div className="grid grid-2" style={{ gap: 14 }}>
              {differentiators.slice(0, 6).map((item) => (
                <div key={item} style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 600 }}>
                  <CheckCircle2 size={20} color="var(--accent)" style={{ flexShrink: 0 }} /> {item}
                </div>
              ))}
            </div>
            <Link className="btn btn-primary" href="/about" style={{ marginTop: 32 }}>About us <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20, marginBottom: 48 }}>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Recent projects</span>
              <h2 className="section-title">Work we are proud of</h2>
            </div>
            <Link className="link-arrow" href="/projects">All projects <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-3 trio">
            {projects.slice(0, 3).map((p) => (
              <Link className="card media-card" href={`/projects/${p.slug}`} key={p.slug}>
                <div className="media">
                  <Image src={p.image} alt={`${p.name}, ${p.location}`} fill sizes="(max-width: 720px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                  <span className="tag">{p.category}</span>
                </div>
                <div className="media-card-body">
                  <h3 style={{ fontSize: "1.15rem" }}>{p.name}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{p.location} · {p.completion}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-white">
        <div className="container">
          <SectionHeader center eyebrow="FAQ" title="Frequently asked questions" />
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
