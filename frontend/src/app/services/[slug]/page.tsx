import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { JsonLd } from "@/components/common/JsonLd";
import { services, calculators } from "@/constants/site";
import { pageSeo } from "@/lib/seo";
import { CheckCircle2, Calculator, ArrowRight, Phone } from "lucide-react";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return pageSeo(
    service?.title || "Service",
    service?.summary || "Professional electrical services in Mumbai."
  );
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

function getRelatedCalculators(slug: string) {
  switch (slug) {
    case "electrical-contracting":
      return ["load", "cable-size", "voltage-drop", "power"];
    case "electrical-consultancy":
      return ["load", "consumption", "power", "generator"];
    case "meter-passing-services":
      return ["load", "power"];
    case "electrical-panels":
      return ["load", "transformer", "cable-size"];
    case "cctv-solutions":
      return ["cctv"];
    case "home-automation":
      return ["home-automation", "cctv"];
    case "energy-management":
      return ["solar", "consumption", "ups"];
    case "industrial-installations":
      return ["load", "cable-size", "generator", "transformer"];
    case "commercial-installations":
      return ["load", "ups", "consumption"];
    default:
      return ["load"];
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const relatedSlugs = getRelatedCalculators(slug);
  const relatedCalcs = calculators.filter((calc) => relatedSlugs.includes(calc.slug));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Siddhi Electricals",
      "url": "https://siddhielectricals.com"
    },
    "description": service.summary,
    "areaServed": "Mumbai"
  };

  return (
    <>
      <JsonLd data={serviceSchema} />

      <PageHero
        eyebrow="Service Details"
        title={service.title}
        description={service.summary}
      />

      <section className="band" style={{ background: "#ffffff" }}>
        <div className="container split">
          {/* Main Info */}
          <div>
            <SectionHeader eyebrow="Scope of Work" title={`What we do in ${service.title}`} />
            
            <div style={{ display: "grid", gap: 14, margin: "24px 0" }}>
              {service.details.map((detail) => (
                <div className="glass" key={detail} style={{ padding: 18, display: "flex", gap: 12, alignItems: "center" }}>
                  <CheckCircle2 color="#0d7b5f" size={24} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1a1a1a" }}>{detail}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
              <Link className="btn btn-primary" href={`/contact?service=${encodeURIComponent(service.title)}`}>
                Request Service Quote
              </Link>
              <Link className="btn btn-secondary" href="/contact" style={{ display: "flex", gap: 8 }}>
                <Phone size={16} /> Contact Sales
              </Link>
            </div>
          </div>

          {/* Visual Showcase */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ position: "relative", minHeight: 320, width: "100%", borderRadius: 8, overflow: "hidden", border: "1px solid #dde8e4" }}>
              <Image
                src={service.image}
                alt={service.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
            
            <div className="glass" style={{ padding: 24 }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#0d7b5f" }}>Standard Execution Flow</h3>
              <ol style={{ paddingLeft: 16, margin: 0, color: "#4c5754", fontSize: "0.95rem", display: "grid", gap: 8 }}>
                <li>Site inspection &amp; initial load checklist.</li>
                <li>Single Line Diagram (SLD) / Layout planning.</li>
                <li>Procurement &amp; licensed field execution.</li>
                <li>Insulation &amp; earth continuity inspections.</li>
                <li>Utility submission (if required) &amp; Client handover.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Related Calculators Section */}
      {relatedCalcs.length > 0 && (
        <section className="band" style={{ background: "#f8f8f8" }}>
          <div className="container">
            <SectionHeader
              eyebrow="Utility Tools"
              title="Related Engineering Calculators"
              description="Calculate load parameters, cable sizing, or solar ROI related to this service instantly."
            />
            <div className="grid grid-3" style={{ marginTop: 24 }}>
              {relatedCalcs.map((calc) => {
                const CalcIcon = calc.icon;
                return (
                  <div className="card" key={calc.slug} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                        <CalcIcon color="#f7931e" size={24} />
                        <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{calc.title}</h4>
                      </div>
                      <p style={{ color: "#4c5754", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: 18 }}>
                        Estimate parameters instantly using our engineering-validated calculator form.
                      </p>
                    </div>
                    <Link className="btn btn-primary" href={`/calculators/${calc.slug}`} style={{ width: "100%", display: "flex", gap: 8, minHeight: 38, fontSize: "0.85rem" }}>
                      <Calculator size={16} /> Open Calculator <ArrowRight size={14} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
