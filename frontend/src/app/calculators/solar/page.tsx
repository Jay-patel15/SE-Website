import { SolarCalculator } from "@/components/calculators/SolarCalculator/SolarCalculator";
import { CalculatorPageFrame } from "@/components/calculators/CalculatorPageFrame";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo("Solar Calculator", "Estimate solar capacity, panels, savings, ROI, and payback period.");

export default function Page() {
  return <CalculatorPageFrame title="Solar Calculator"><SolarCalculator /></CalculatorPageFrame>;
}
