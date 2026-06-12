import { CCTVCalculator } from "@/components/calculators/CCTVCalculator/CCTVCalculator";
import { CalculatorPageFrame } from "@/components/calculators/CalculatorPageFrame";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo("CCTV Requirement Calculator", "Estimate CCTV camera count, NVR requirement, storage, and cost.");

export default function Page() {
  return <CalculatorPageFrame title="CCTV Requirement Calculator"><CCTVCalculator /></CalculatorPageFrame>;
}
