import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CtaBand } from "@/components/common/CtaBand";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHero } from "@/components/common/PageHero";
import { brand, calculators } from "@/constants/site";
import { pageSeo } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const calculator = calculators.find((item) => item.slug === slug);
  if (!calculator) return {};
  return pageSeo(calculator.title, `Free ${calculator.title.toLowerCase()}. ${calculator.description}`, `/calculators/${slug}`, [calculator.title]);
}

export function generateStaticParams() {
  return calculators.map((calculator) => ({ slug: calculator.slug }));
}

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const calculator = calculators.find((item) => item.slug === slug);
  if (!calculator) notFound();

  const others = calculators.filter((c) => c.slug !== slug).slice(0, 6);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: calculator.title,
          description: calculator.description,
          url: `${brand.url}/calculators/${slug}`,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
          publisher: { "@id": `${brand.url}/#business` }
        }}
      />
      <PageHero
        crumbs={[{ label: "Calculators", href: "/calculators" }, { label: calculator.title, href: `/calculators/${slug}` }]}
        eyebrow="Calculator"
        title={calculator.title}
        description={calculator.description}
      />
      <section className="band">
        <div className="container">
          <Link className="btn btn-ghost btn-sm" href="/calculators" style={{ marginBottom: 24 }}>
            <ArrowLeft size={16} /> All calculators
          </Link>
          <CalculatorShell title={calculator.title} slug={calculator.slug} />

          <h2 style={{ fontSize: "1.4rem", margin: "72px 0 24px" }}>More calculators</h2>
          <div className="grid grid-3">
            {others.map((c) => (
              <Link className="card" href={`/calculators/${c.slug}`} key={c.slug} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: 20 }}>
                <span style={{ fontWeight: 700 }}>{c.title}</span>
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
