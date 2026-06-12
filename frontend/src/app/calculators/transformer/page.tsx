import { TransformerCalculator } from "@/components/calculators/TransformerCalculator/TransformerCalculator";
import { CalculatorPageFrame } from "@/components/calculators/CalculatorPageFrame";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo("Transformer Calculator", "Estimate transformer capacity from connected load, demand factor, and power factor.");

export default function Page() {
  return <CalculatorPageFrame title="Transformer Calculator"><TransformerCalculator /></CalculatorPageFrame>;
}
