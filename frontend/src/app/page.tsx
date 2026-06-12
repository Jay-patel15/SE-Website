import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/common/SectionHeader";
import { JsonLd } from "@/components/common/JsonLd";
import {
  brand,
  differentiators,
  industries,
  services,
  clientLogos,
  processSteps,
  downloads
} from "@/constants/site";
import { pageSeo } from "@/lib/seo";
import { ArrowRight, Download, CheckCircle, Zap, PlugZap, Bolt, Factory, Building2, Home } from "lucide-react";

export const metadata = pageSeo(
  "Siddhi Electricals",
  "Premium HT/LT electrical contracting, licensed consultancy, utility meter passing, CCTV, and smart home automation services in Mumbai."
);

export default function HomePage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": brand.name,
    "image": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
    "@id": "https://siddhielectricals.com/#localbusiness",
    "url": "https://siddhielectricals.com",
    "telephone": brand.phone,
    "email": brand.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mumbai, Maharashtra, India",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.0760,
      "longitude": 72.8777
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    }
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <span className="eyebrow">{brand.tagline}</span>
          <h1>Complete Electrical Contracting &amp; Consultancy</h1>
          <p className="lead" style={{ maxWidth: 680 }}>
            Trusted partner for industrial, commercial, and residential electrical projects with precision engineering, safe execution, and approval-ready utility documentation.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/contact">Get Free Consultation</Link>
            <Link className="btn btn-secondary" href="/contact">Request Quotation</Link>
          </div>
          <div className="stat-grid">
            {["100+ Projects", "10+ Years", "500+ Clients", "Govt. Licensed"].map((stat) => {
              const [value, ...label] = stat.split(" ");
              return (
                <div className="glass stat" key={stat}>
                  <strong>{value}</strong>
                  <span>{label.join(" ")}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Client Logo / Trust Band */}
      <section className="band" style={{ background: "#ffffff", padding: "40px 0", borderBottom: "1px solid #eaeaea" }}>
        <div className="container">
          <p style={{ textAlign: "center", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 800, color: "#8c9794", letterSpacing: "0.15em", marginBottom: 20 }}>
            Liaisoning, Audits &amp; Execution Support For
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px 48px", alignItems: "center" }}>
            {clientLogos.map((client) => (
              <span key={client} style={{ color: "#4c5754", fontWeight: 700, fontSize: "1.1rem" }}>
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="band">
        <div className="container">
          <SectionHeader
            eyebrow="Services"
            title="Engineering-led services from design to commissioning"
            description="Siddhi Electricals combines site execution, electrical design, utility coordination, and modern security capabilities."
          />
          <div className="grid grid-3">
            {services.slice(0, 6).map((service) => {
              const Icon = service.icon;
              return (
                <article className="card" key={service.slug}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                    <Icon color="#0D7B5F" size={32} />
                    <h3 style={{ margin: 0, fontSize: "1.3rem" }}>{service.title}</h3>
                  </div>
                  <p style={{ color: "#4c5754", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 18 }}>{service.summary}</p>
                  <Link href={`/services/${service.slug}`} style={{ color: "#0D7B5F", fontWeight: 900, display: "inline-flex", alignItems: "center", gap: 6 }}>
                    Learn More <ArrowRight size={16} />
                  </Link>
                </article>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link className="btn btn-primary" href="/services">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="band dark-band">
        <div className="container">
          <SectionHeader
            eyebrow="Execution Process"
            title="Structured delivery model for guaranteed safety &amp; compliance"
          />
          <div className="grid grid-4" style={{ marginTop: 40 }}>
            {processSteps.map((step, idx) => (
              <div className="glass" key={step.title} style={{ padding: 24, position: "relative" }}>
                <span style={{ fontSize: "3rem", fontWeight: 900, color: "rgba(247, 147, 30, 0.25)", position: "absolute", right: 18, top: 12 }}>
                  0{idx + 1}
                </span>
                <h3 style={{ margin: "0 0 10px 0", color: "#ffffff", fontSize: "1.25rem" }}>{step.title}</h3>
                <p style={{ margin: 0, color: "#d9eee7", fontSize: "0.95rem", lineHeight: 1.6 }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Industries Section */}
      <section className="band" style={{ background: "white" }}>
        <div className="container grid grid-3" style={{ alignItems: "center" }}>
          <div>
            <Image
              src={brand.logoBulb}
              alt="Siddhi Electricals bulb mark"
              width={480}
              height={520}
              style={{ width: "100%", height: "auto", maxHeight: 520, objectFit: "contain" }}
            />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <SectionHeader eyebrow="Why Choose Us" title="Reliable electrical execution with consultancy-grade thinking" />
            <div className="grid grid-2" style={{ gap: 14, marginBottom: 28 }}>
              {differentiators.map((item) => (
                <div className="glass" style={{ padding: "16px 20px", fontWeight: 800, display: "flex", alignItems: "center", gap: 10, color: "#0d7b5f" }} key={item}>
                  <CheckCircle size={20} color="#f7931e" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="band">
        <div className="container">
          <SectionHeader eyebrow="Industries" title="Built for sites where uptime and safety matter" />
          <div className="grid grid-4">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div className="card" key={industry.title}>
                  <Icon color="#0D7B5F" size={32} style={{ marginBottom: 12 }} />
                  <h3 style={{ margin: "0 0 8px 0" }}>{industry.title}</h3>
                  <p style={{ color: "#4c5754", fontSize: "0.9rem", lineHeight: 1.5 }}>
                    Electrical systems designed around load, approvals, safety, and future expansion.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="band" style={{ background: "#ffffff", overflow: "hidden" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .marquee-container {
            overflow: hidden !important;
            white-space: nowrap !important;
            width: 100% !important;
            padding: 30px 0 !important;
            position: relative !important;
            display: block !important;
          }
          .marquee-content {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            gap: 24px !important;
            width: max-content !important;
            animation: marquee-scroll 28s linear infinite !important;
          }
          .marquee-content:hover {
            animation-play-state: paused !important;
          }
          .marquee-card {
            flex-shrink: 0 !important;
            width: 340px !important;
            background: white !important;
            border: 1px solid #dde8e4 !important;
            border-radius: 8px !important;
            padding: 22px !important;
            box-shadow: 0 16px 48px rgba(13, 44, 36, 0.04) !important;
            display: flex !important;
            gap: 14px !important;
            align-items: flex-start !important;
            white-space: normal !important;
            transition: border-color 0.2s ease, transform 0.2s ease !important;
          }
          .marquee-card:hover {
            border-color: var(--primary) !important;
            transform: translateY(-2px) !important;
          }
        `}} />
        <div className="container">
          <SectionHeader
            eyebrow="Our Clients"
            title="Trusted for Utility Coordination &amp; Execution"
            description="We bridge the gap between heavy site execution and utility inspections, facilitating compliance files, approvals, and connections."
          />
        </div>

        <div className="marquee-container" style={{ maskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)" }}>
          <div className="marquee-content">
            {[
              { title: "Adani Electricity", desc: "Facilitating load enhancements, meter board setup approvals, and wiring test reports.", icon: Zap },
              { title: "Tata Power", desc: "Coordinating technical terminations, grounding pits passing, and substation layouts.", icon: PlugZap },
              { title: "BEST Electricity", desc: "Managing island city heritage board modifications, meter loops, and inspector passing.", icon: Bolt },
              { title: "Industrial Plants", desc: "Turnkey HT/LT cabling, customized panel fabrications, and safety certification audits.", icon: Factory },
              { title: "Commercial Buildings", desc: "Sub-meter distribution, back-up power changeovers, and smart IoT automation setups.", icon: Building2 },
              { title: "Residential Societies", desc: "Common area lighting retrofits, CCTV network installations, and EV charging station setups.", icon: Home },
              // Duplicate items for continuous looping
              { title: "Adani Electricity", desc: "Facilitating load enhancements, meter board setup approvals, and wiring test reports.", icon: Zap },
              { title: "Tata Power", desc: "Coordinating technical terminations, grounding pits passing, and substation layouts.", icon: PlugZap },
              { title: "BEST Electricity", desc: "Managing island city heritage board modifications, meter loops, and inspector passing.", icon: Bolt },
              { title: "Industrial Plants", desc: "Turnkey HT/LT cabling, customized panel fabrications, and safety certification audits.", icon: Factory },
              { title: "Commercial Buildings", desc: "Sub-meter distribution, back-up power changeovers, and smart IoT automation setups.", icon: Building2 },
              { title: "Residential Societies", desc: "Common area lighting retrofits, CCTV network installations, and EV charging station setups.", icon: Home }
            ].map((client, idx) => {
              const Icon = client.icon;
              return (
                <div key={`${client.title}-${idx}`} className="marquee-card">
                  <div style={{ background: "rgba(13, 123, 95, 0.1)", color: "var(--primary)", padding: 10, borderRadius: 8, display: "flex", flexShrink: 0 }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "1.2rem", color: "#1a1a1a", fontWeight: 800 }}>{client.title}</h3>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "#4c5754", lineHeight: 1.5 }}>
                      {client.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="band" style={{ background: "#f8f8f8" }}>
        <div className="container">
          <SectionHeader
            eyebrow="Downloads"
            title="Technical resources &amp; documents for engineering planning"
          />
          <div className="grid grid-3" style={{ marginTop: 24 }}>
            {downloads.map((dl) => (
              <div className="card" key={dl.title} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <h3 style={{ margin: 0, fontSize: "1.15rem" }}>{dl.title}</h3>
                    <span className="pill" style={{ fontSize: "0.75rem", padding: "2px 8px" }}>{dl.type}</span>
                  </div>
                  <p style={{ color: "#4c5754", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: 20 }}>
                    {dl.description}
                  </p>
                </div>
                <button className="btn btn-secondary" style={{ width: "100%", display: "flex", gap: 8, minHeight: 40, fontSize: "0.9rem" }}>
                  <Download size={16} /> Download Reference
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="band">
        <div className="container glass" style={{ padding: 36, display: "flex", justifyContent: "space-between", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <span className="eyebrow">Contact Us</span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", margin: "10px 0" }}>Need a quotation or site consultation?</h2>
            <p className="lead" style={{ margin: 0 }}>Share your load, site type, and approval requirement. The team will help you plan the next step.</p>
          </div>
          <Link className="btn btn-secondary" href="/contact">Start Inquiry</Link>
        </div>
      </section>
    </>
  );
}
