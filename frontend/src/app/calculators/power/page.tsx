import { PowerCalculator } from "@/components/calculators/PowerCalculator/PowerCalculator";
import { CalculatorPageFrame } from "@/components/calculators/CalculatorPageFrame";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo("Electrical Power Calculator", "Calculate single-phase and three-phase electrical power.");

export default function Page() {
  return <CalculatorPageFrame title="Electrical Power Calculator"><PowerCalculator /></CalculatorPageFrame>;
}
