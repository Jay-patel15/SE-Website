import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, CheckCircle2, MapPin, Tag } from "lucide-react";
import { CtaBand } from "@/components/common/CtaBand";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHero } from "@/components/common/PageHero";
import { brand, projects } from "@/constants/site";
import { pageSeo } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return pageSeo(`${project.name}, ${project.location}`, `${project.category} project in ${project.location} by ${brand.name}: ${project.scope}.`, `/projects/${slug}`);
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const scopeItems = project.scope.split(",").map((item) => item.trim());
  const facts = [
    { label: "Category", value: project.category, icon: Tag },
    { label: "Location", value: project.location, icon: MapPin },
    { label: "Completed", value: project.completion, icon: Calendar }
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.name,
          description: project.scope,
          image: project.image,
          dateCreated: project.completion,
          locationCreated: { "@type": "Place", name: project.location },
          creator: { "@id": `${brand.url}/#business` }
        }}
      />

      <PageHero
        crumbs={[{ label: "Projects", href: "/projects" }, { label: project.name, href: `/projects/${slug}` }]}
        eyebrow={`${project.category} project`}
        title={project.name}
        description={`Scope, execution and handover details for our ${project.category.toLowerCase()} project in ${project.location}.`}
      />

      <section className="band band-white">
        <div className="container split" style={{ alignItems: "start" }}>
          <div className="image-frame wide">
            <Image src={project.image} alt={`${project.name}, ${project.location}`} fill priority sizes="(max-width: 720px) 100vw, 50vw" style={{ objectFit: "cover" }} />
          </div>

          <div style={{ display: "grid", gap: 28 }}>
            <div className="grid grid-3 trio" style={{ gap: 12 }}>
              {facts.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className="card" style={{ padding: 16 }}>
                    <Icon size={18} color="var(--accent)" />
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--muted)", fontWeight: 700, textTransform: "uppercase", marginTop: 6 }}>{f.label}</span>
                    <strong>{f.value}</strong>
                  </div>
                );
              })}
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: 16 }}>Work executed</h2>
              <ul className="check-list">
                {scopeItems.map((item) => <li key={item} style={{ fontWeight: 600, color: "var(--foreground)" }}><CheckCircle2 size={20} /> {item}</li>)}
              </ul>
            </div>

            {project.testimonial && (
              <figure className="card quote" style={{ margin: 0, borderLeft: "4px solid var(--accent)" }}>
                <blockquote style={{ margin: 0 }}><p>&ldquo;{project.testimonial}&rdquo;</p></blockquote>
                <footer>Client, {project.location}</footer>
              </figure>
            )}

            <Link className="link-arrow" href="/projects"><ArrowLeft size={16} /> Back to projects</Link>
          </div>
        </div>
      </section>

      <CtaBand title="Need a similar setup for your site?" />
    </>
  );
}
