import { ConsumptionCalculator } from "@/components/calculators/ConsumptionCalculator/ConsumptionCalculator";
import { CalculatorPageFrame } from "@/components/calculators/CalculatorPageFrame";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo("Consumption Calculator", "Estimate appliance energy consumption and monthly electricity bill.");

export default function Page() {
  return <CalculatorPageFrame title="Consumption Calculator"><ConsumptionCalculator /></CalculatorPageFrame>;
}
