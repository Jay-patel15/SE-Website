import { notFound } from "next/navigation";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SectionHeader } from "@/components/common/SectionHeader";
import { calculators } from "@/constants/site";
import { pageSeo } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const calculator = calculators.find((item) => item.slug === slug);
  return pageSeo(calculator?.title || "Calculator", `${calculator?.title || "Electrical calculator"} by Siddhi Electricals for project planning.`);
}

export function generateStaticParams() {
  return calculators.map((calculator) => ({ slug: calculator.slug }));
}

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const calculator = calculators.find((item) => item.slug === slug);
  if (!calculator) notFound();

  return (
    <section className="band">
      <div className="container">
        <SectionHeader eyebrow="Calculator" title={calculator.title} description="Adjust inputs to see live estimates. Save, PDF export, email reports, and analytics hooks are designed for Supabase-backed implementation." />
        <CalculatorShell title={calculator.title} slug={calculator.slug} />
      </div>
    </section>
  );
}
