import Link from "next/link";
import { SectionHeader } from "@/components/common/SectionHeader";
import { calculators } from "@/constants/site";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo("Electrical Calculators", "Professional electrical calculators for EV charging, solar, load, power, cable sizing, UPS, generator, transformer, CCTV, and automation planning.");

export default function CalculatorsPage() {
  return (
    <section className="band">
      <div className="container">
        <SectionHeader eyebrow="Tools" title="Engineering calculators for faster project planning" description="Use these responsive tools for early estimates, cost planning, and consultation requests." />
        <div className="grid grid-3">
          {calculators.map((calculator) => {
            const Icon = calculator.icon;
            return (
              <Link className="card" key={calculator.slug} href={`/calculators/${calculator.slug}`}>
                <Icon color="#0D7B5F" size={34} />
                <h2>{calculator.title}</h2>
                <p>Live calculations, print-friendly results, WhatsApp sharing, and report-ready layout.</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
