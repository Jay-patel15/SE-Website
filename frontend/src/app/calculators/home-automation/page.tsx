import { HomeAutomationCalculator } from "@/components/calculators/HomeAutomationCalculator/HomeAutomationCalculator";
import { CalculatorPageFrame } from "@/components/calculators/CalculatorPageFrame";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo("Home Automation Calculator", "Estimate smart home automation budget and installation cost.");

export default function Page() {
  return <CalculatorPageFrame title="Home Automation Calculator"><HomeAutomationCalculator /></CalculatorPageFrame>;
}
