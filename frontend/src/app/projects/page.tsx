import { PageHero } from "@/components/common/PageHero";
import { ProjectsClient } from "@/components/common/ProjectsClient";
import { projects } from "@/constants/site";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo(
  "Projects",
  "Portfolio of completed industrial, commercial, and residential electrical installations, audits, and automation setups by Siddhi Electricals."
);

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="A Portfolio of Reliable Electrical Execution"
        description="Browse our record of successful HT/LT grid installations, commercial meter approvals, CCTV setups, and custom-engineered panel upgrades across Mumbai."
      />

      <section className="band">
        <div className="container">
          <ProjectsClient initialProjects={projects} />
        </div>
      </section>
    </>
  );
}
