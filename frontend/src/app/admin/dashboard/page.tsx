import { SectionHeader } from "@/components/common/SectionHeader";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo("Admin Dashboard", "Siddhi Electricals admin dashboard for content, projects, leads, downloads, and calculator analytics.");

export default function AdminDashboardPage() {
  const modules = ["Projects", "Services", "Calculators", "Gallery", "Blog", "Testimonials", "Leads", "Careers", "Downloads", "Settings"];

  return (
    <section className="band">
      <div className="container">
        <SectionHeader eyebrow="Admin" title="Operations dashboard" description="Protected admin routes are structured for Supabase Auth and role-based access control." />
        <div className="grid grid-3">{modules.map((module) => <div className="card" key={module}><h2>{module}</h2><p>CRUD, analytics, exports, and upload workflows are scaffolded for this module.</p></div>)}</div>
      </div>
    </section>
  );
}
