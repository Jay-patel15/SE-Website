import { CtaBand } from "@/components/common/CtaBand";
import { PageHero } from "@/components/common/PageHero";
import { ProjectsClient } from "@/components/common/ProjectsClient";
import { projects } from "@/constants/site";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo(
  "Our Projects",
  "Completed industrial, commercial and residential electrical projects by Siddhi Electricals: panel upgrades, meter approvals, CCTV and home automation across Mumbai.",
  "/projects"
);

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Projects", href: "/projects" }]}
        eyebrow="Our work"
        title="Projects delivered across Mumbai"
        description="Panel upgrades, utility meter approvals, CCTV coverage and smart home installations, each tested, documented and handed over on schedule."
      />
      <section className="band">
        <div className="container">
          <ProjectsClient initialProjects={projects} />
        </div>
      </section>
      <CtaBand title="Need something similar?" />
    </>
  );
}
