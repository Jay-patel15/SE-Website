import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { CtaBand } from "@/components/common/CtaBand";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { brand, calculators, services } from "@/constants/site";
import { pageSeo } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

const relatedCalculators: Record<string, string[]> = {
  "electrical-contracting": ["load", "cable-size", "voltage-drop"],
  "electrical-consultancy": ["load", "consumption", "generator"],
  "meter-passing-services": ["load", "power"],
  "electrical-panels": ["load", "transformer", "cable-size"],
  "cctv-solutions": ["cctv"],
  "home-automation": ["home-automation", "cctv"],
  "energy-management": ["solar", "consumption", "ups"],
  "industrial-installations": ["load", "cable-size", "transformer"],
  "commercial-installations": ["load", "ups", "consumption"]
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return pageSeo(
    `${service.title} in Mumbai`,
    `${service.summary} Licensed electrical contractor serving Mumbai, Thane and Navi Mumbai.`,
    `/services/${slug}`,
    [service.title, ...service.details]
  );
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const related = calculators.filter((c) => (relatedCalculators[slug] || ["load"]).includes(c.slug));
  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: service.title,
          name: service.title,
          description: service.summary,
          provider: { "@id": `${brand.url}/#business` },
          areaServed: ["Mumbai", "Thane", "Navi Mumbai"],
          url: `${brand.url}/services/${slug}`
        }}
      />

      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: service.title, href: `/services/${slug}` }]}
        eyebrow="Service"
        title={service.title}
        description={service.summary}
        actions={
          <>
            <Link className="btn btn-secondary" href={`/contact?service=${encodeURIComponent(service.title)}`}>Request a Quote <ArrowRight size={16} /></Link>
            <a className="btn btn-light" href={`tel:${brand.phone.replaceAll(" ", "")}`}><Phone size={16} /> Call Now</a>
          </>
        }
      />

      <section className="band band-white">
        <div className="container split">
          <div>
            <SectionHeader eyebrow="Scope of work" title="What's included" />
            <ul className="check-list grid-2">
              {service.details.map((d) => (
                <li key={d} style={{ fontWeight: 600, color: "var(--foreground)" }}><CheckCircle2 size={20} /> {d}</li>
              ))}
            </ul>
          </div>
          <div className="image-frame wide">
            <Image src={service.image} alt={`${service.title} by ${brand.name}`} fill sizes="(max-width: 720px) 100vw, 50vw" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <SectionHeader eyebrow="Helpful tools" title="Related calculators" />
          <div className="grid grid-3 trio">
            {related.map((c) => {
              const Icon = c.icon;
              return (
                <Link className="card" href={`/calculators/${c.slug}`} key={c.slug} style={{ display: "grid", gap: 12 }}>
                  <span className="icon-badge orange"><Icon size={24} /></span>
                  <h3 style={{ fontSize: "1.1rem" }}>{c.title}</h3>
                  <p style={{ color: "var(--text)", fontSize: "0.95rem" }}>{c.description}</p>
                </Link>
              );
            })}
          </div>

          <h2 style={{ fontSize: "1.4rem", margin: "64px 0 24px" }}>Other services</h2>
          <div className="grid grid-3 trio">
            {others.map((s) => (
              <Link className="card" href={`/services/${s.slug}`} key={s.slug} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: 20 }}>
                <span style={{ fontWeight: 700 }}>{s.title}</span>
                <ArrowRight size={18} color="var(--primary)" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
