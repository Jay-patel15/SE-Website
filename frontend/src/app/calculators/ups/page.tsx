import { UPSCalculator } from "@/components/calculators/UPSCalculator/UPSCalculator";
import { CalculatorPageFrame } from "@/components/calculators/CalculatorPageFrame";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo("UPS Capacity Calculator", "Estimate UPS capacity and battery bank size.");

export default function Page() {
  return <CalculatorPageFrame title="UPS Capacity Calculator"><UPSCalculator /></CalculatorPageFrame>;
}
