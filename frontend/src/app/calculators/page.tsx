import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/common/CtaBand";
import { PageHero } from "@/components/common/PageHero";
import { calculators } from "@/constants/site";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo(
  "Electrical Calculators",
  "Free online electrical calculators: load, cable size, voltage drop, power, solar, EV charging, UPS, generator, transformer, CCTV and home automation estimates.",
  "/calculators",
  ["electrical load calculator", "cable size calculator", "voltage drop calculator", "solar calculator India"]
);

export default function CalculatorsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Calculators", href: "/calculators" }]}
        eyebrow="Free tools"
        title="Electrical calculators"
        description="Quick, practical estimates for load, cable sizing, solar, backup power and more. Use them for early planning, then let our engineers confirm the final design."
      />
      <section className="band">
        <div className="container grid grid-3">
          {calculators.map((c) => {
            const Icon = c.icon;
            return (
              <Link className="card" key={c.slug} href={`/calculators/${c.slug}`} style={{ display: "grid", gap: 12, alignContent: "start" }}>
                <span className="icon-badge orange"><Icon size={24} /></span>
                <h2 style={{ fontSize: "1.15rem" }}>{c.title}</h2>
                <p style={{ color: "var(--text)", fontSize: "0.95rem" }}>{c.description}</p>
                <span className="link-arrow">Open calculator <ArrowRight size={16} /></span>
              </Link>
            );
          })}
        </div>
      </section>
      <CtaBand title="Need an exact design?" text="Calculators give estimates. Our licensed engineers can survey your site and prepare a precise load and cable schedule." />
    </>
  );
}
