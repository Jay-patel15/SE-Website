import { SectionHeader } from "@/components/common/SectionHeader";

type AdminModulePageProps = {
  title: string;
};

export function AdminModulePage({ title }: AdminModulePageProps) {
  return (
    <section className="band">
      <div className="container">
        <SectionHeader eyebrow="Admin" title={`${title} Management`} description="Role-protected CRUD workspace prepared for Supabase Auth, audit trails, uploads, and exports." />
        <div className="card">
          <h2>{title} records</h2>
          <p className="lead">Connect this module to a repository and table-specific form schema to manage production content.</p>
        </div>
      </div>
    </section>
  );
}
