import { EVCalculator } from "@/components/calculators/EVCalculator/EVCalculator";
import { CalculatorPageFrame } from "@/components/calculators/CalculatorPageFrame";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo("EV Charging Time Calculator", "Calculate EV charging time, energy consumed, and charging cost.");

export default function Page() {
  return <CalculatorPageFrame title="EV Charging Time Calculator"><EVCalculator /></CalculatorPageFrame>;
}
