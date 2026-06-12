import { GeneratorCalculator } from "@/components/calculators/GeneratorCalculator/GeneratorCalculator";
import { CalculatorPageFrame } from "@/components/calculators/CalculatorPageFrame";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo("Generator Sizing Calculator", "Estimate recommended generator size from running and starting load.");

export default function Page() {
  return <CalculatorPageFrame title="Generator Sizing Calculator"><GeneratorCalculator /></CalculatorPageFrame>;
}
