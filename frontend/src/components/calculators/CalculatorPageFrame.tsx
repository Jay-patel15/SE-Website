import { SectionHeader } from "@/components/common/SectionHeader";

type CalculatorPageFrameProps = {
  title: string;
  children: React.ReactNode;
};

export function CalculatorPageFrame({ title, children }: CalculatorPageFrameProps) {
  return (
    <section className="band">
      <div className="container">
        <SectionHeader eyebrow="Calculator" title={title} description="Responsive live calculator with print and WhatsApp sharing. PDF export, email reporting, saved calculations, and analytics are prepared for Supabase-backed expansion." />
        {children}
      </div>
    </section>
  );
}
