import { VoltageDropCalculator } from "@/components/calculators/VoltageDropCalculator/VoltageDropCalculator";
import { CalculatorPageFrame } from "@/components/calculators/CalculatorPageFrame";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo("Voltage Drop Calculator", "Calculate voltage drop, percentage loss, and safe/warning/critical status.");

export default function Page() {
  return <CalculatorPageFrame title="Voltage Drop Calculator"><VoltageDropCalculator /></CalculatorPageFrame>;
}
