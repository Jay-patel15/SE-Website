import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/common/CtaBand";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { industries, services } from "@/constants/site";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo(
  "Electrical Services in Mumbai",
  "Licensed HT/LT electrical contracting, consultancy, Adani / Tata Power / BEST meter passing, electrical panels, CCTV, home automation and energy management in Mumbai.",
  "/services"
);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }]}
        eyebrow="Our services"
        title="Complete electrical services for every stage of your project"
        description="Licensed field work combined with compliance consulting, delivering safe, inspection-ready installations for industrial, commercial and residential sites."
      />

      <section className="band">
        <div className="container grid grid-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className="card media-card card-hover" key={service.slug}>
                <div className="media">
                  <Image src={service.image} alt={service.title} fill sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 33vw" style={{ objectFit: "cover" }} />
                </div>
                <div className="media-card-body">
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className="icon-badge" style={{ width: 42, height: 42 }}><Icon size={20} /></span>
                    <h2 style={{ fontSize: "1.2rem" }}>{service.title}</h2>
                  </div>
                  <p style={{ color: "var(--text)" }}>{service.summary}</p>
                  <Link className="link-arrow" href={`/services/${service.slug}`} style={{ marginTop: "auto" }}>
                    View details <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="band band-white">
        <div className="container">
          <SectionHeader center eyebrow="Industries" title="Built for sites where uptime and safety matter" />
          <div className="grid grid-4">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div className="card" key={industry.title} style={{ display: "flex", gap: 14, alignItems: "center", padding: 20 }}>
                  <span className="icon-badge orange" style={{ width: 44, height: 44 }}><Icon size={22} /></span>
                  <h3 style={{ fontSize: "1rem" }}>{industry.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand title="Need a site survey?" text="We arrange on-site safety audits, load checks and technical feasibility reports for new and existing installations." />
    </>
  );
}
