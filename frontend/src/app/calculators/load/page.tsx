import { LoadCalculator } from "@/components/calculators/LoadCalculator/LoadCalculator";
import { CalculatorPageFrame } from "@/components/calculators/CalculatorPageFrame";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo("Electrical Load Calculator", "Calculate connected load, demand load, recommended MCB, and cable guidance.");

export default function Page() {
  return <CalculatorPageFrame title="Electrical Load Calculator"><LoadCalculator /></CalculatorPageFrame>;
}
