import { CableCalculator } from "@/components/calculators/CableCalculator/CableCalculator";
import { CalculatorPageFrame } from "@/components/calculators/CalculatorPageFrame";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo("Cable Size Calculator", "Estimate cable size, voltage drop, and safety margin.");

export default function Page() {
  return <CalculatorPageFrame title="Cable Size Calculator"><CableCalculator /></CalculatorPageFrame>;
}
