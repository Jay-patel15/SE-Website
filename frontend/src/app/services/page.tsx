import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/common/PageHero";
import { services } from "@/constants/site";
import { pageSeo } from "@/lib/seo";
import { ArrowRight, Check } from "lucide-react";

export const metadata = pageSeo(
  "Electrical Services",
  "Licensed HT/LT contracting, load consulting, utility meter passing (Adani, Tata, BEST), panels, CCTV, and smart automation in Mumbai."
);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Expertise"
        title="Turnkey Electrical Services for Every Project Stage"
        description="We combine licensed fieldwork with compliance consulting to deliver safe, inspection-ready installations across industrial, commercial, and residential spaces."
      />

      <section className="band">
        <div className="container">
          <div className="grid grid-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="card media-card" key={service.slug} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ position: "relative", minHeight: 200, width: "100%" }}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 900px) 100vw, 33vw"
                    />
                    <div style={{ position: "absolute", top: 12, left: 12, backgroundColor: "rgba(13, 123, 95, 0.95)", color: "white", padding: "6px 10px", borderRadius: 4, display: "flex", alignItems: "center", gap: 6 }}>
                      <Icon size={16} />
                    </div>
                  </div>
                  
                  <div className="media-card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1 }}>
                    <div>
                      <h2 style={{ fontSize: "1.4rem", margin: "0 0 10px 0" }}>{service.title}</h2>
                      <p style={{ color: "#4c5754", fontSize: "0.95rem", lineHeight: 1.5, marginBottom: 16 }}>
                        {service.summary}
                      </p>
                      <div style={{ margin: "0 0 20px 0" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", color: "#8c9794", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>
                          Includes:
                        </span>
                        <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "grid", gap: 6 }}>
                          {service.details.slice(0, 4).map((detail) => (
                            <li key={detail} style={{ fontSize: "0.85rem", color: "#222", display: "flex", alignItems: "center", gap: 6 }}>
                              <Check size={12} color="#0d7b5f" style={{ strokeWidth: 3 }} /> {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
                      <Link className="btn btn-primary" href={`/services/${service.slug}`} style={{ flex: 1, minHeight: 38, fontSize: "0.85rem" }}>
                        View Details
                      </Link>
                      <Link className="btn btn-secondary" href={`/contact?service=${encodeURIComponent(service.title)}`} style={{ flex: 1, minHeight: 38, fontSize: "0.85rem" }}>
                        Inquire
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="band" style={{ background: "white" }}>
        <div className="container glass" style={{ padding: 36, display: "flex", justifyContent: "space-between", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <span className="eyebrow">Ready to start?</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", margin: "10px 0" }}>Have custom requirements or need a site survey?</h2>
            <p className="lead" style={{ margin: 0 }}>We arrange on-site safety audits, load checks, and technical feasibility reports for new projects.</p>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <Link className="btn btn-primary" href="/contact">Book Survey</Link>
            <Link className="btn btn-secondary" href="/contact">Get Estimate</Link>
          </div>
        </div>
      </section>
    </>
  );
}
