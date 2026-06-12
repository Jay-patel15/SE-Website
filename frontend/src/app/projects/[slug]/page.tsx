import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { JsonLd } from "@/components/common/JsonLd";
import { projects } from "@/constants/site";
import { pageSeo } from "@/lib/seo";
import { MapPin, Calendar, CheckSquare, Award, ArrowLeft } from "lucide-react";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return pageSeo(
    project?.name || "Project Case Study",
    project?.scope || "Siddhi Electricals project execution details."
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  // Split scope text by comma for detailed checklist
  const scopeItems = project.scope.split(",").map((item) => item.trim());

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.name,
    "creator": {
      "@type": "LocalBusiness",
      "name": "Siddhi Electricals"
    },
    "locationCreated": {
      "@type": "Place",
      "name": project.location
    },
    "dateCreated": project.completion,
    "description": project.scope
  };

  return (
    <>
      <JsonLd data={creativeWorkSchema} />

      <PageHero
        eyebrow={`Case Study - ${project.category}`}
        title={project.name}
        description={`Detailed breakdown of technical parameters, installation work, and utility verification in ${project.location}.`}
      />

      <section className="band" style={{ background: "#ffffff" }}>
        <div className="container" style={{ marginBottom: 20 }}>
          <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--primary)", fontWeight: 800, marginBottom: 20 }}>
            <ArrowLeft size={16} /> Back to Projects
          </Link>
        </div>

        <div className="container split">
          {/* Left Column: Scope & Metadata */}
          <div>
            <div className="glass" style={{ padding: 24, marginBottom: 24 }}>
              <h3 style={{ margin: "0 0 16px 0", color: "var(--primary)" }}>Project Summary</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "#8c9794", textTransform: "uppercase", fontWeight: 800 }}>Location</span>
                  <div style={{ fontWeight: 800, color: "#1a1a1a", display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                    <MapPin size={16} color="var(--primary)" /> {project.location}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "#8c9794", textTransform: "uppercase", fontWeight: 800 }}>Completion Year</span>
                  <div style={{ fontWeight: 800, color: "#1a1a1a", display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                    <Calendar size={16} color="var(--primary)" /> {project.completion}
                  </div>
                </div>
              </div>
            </div>

            <SectionHeader eyebrow="Technical Scope" title="Work Executed" />
            <div style={{ display: "grid", gap: 12, margin: "20px 0" }}>
              {scopeItems.map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <CheckSquare size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: "1rem", color: "#4c5754", fontWeight: 700 }}>{item}</span>
                </div>
              ))}
            </div>

            {project.testimonial && (
              <blockquote className="glass" style={{ padding: 24, borderLeft: "4px solid var(--primary)", marginTop: 30, color: "#1a1a1a", fontStyle: "italic" }}>
                &ldquo;{project.testimonial}&rdquo;
                <div style={{ fontSize: "0.85rem", fontStyle: "normal", fontWeight: 800, color: "var(--primary)", marginTop: 12 }}>
                  &mdash; Project Client, {project.location}
                </div>
              </blockquote>
            )}
          </div>

          {/* Right Column: Imagery & Case Study Layout */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ position: "relative", minHeight: 340, width: "100%", borderRadius: 8, overflow: "hidden", border: "1px solid #dde8e4" }}>
              <Image
                src={project.image}
                alt={project.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>

            {/* Case Study Playholders */}
            <div className="glass" style={{ padding: 24 }}>
              <h3 style={{ margin: "0 0 14px 0", display: "flex", alignItems: "center", gap: 8 }}>
                <Award size={20} color="#f7931e" /> Installation Standards
              </h3>
              <div style={{ display: "grid", gap: 12, fontSize: "0.9rem", color: "#4c5754", lineHeight: 1.5 }}>
                <div>
                  <strong>Pre-Execution:</strong> Detailed electrical layout mapping and load balancing schedule approval.
                </div>
                <div>
                  <strong>Material Standards:</strong> Use of IS-certified armored copper/aluminum cables and fire-retardant panel boards.
                </div>
                <div>
                  <strong>Verification &amp; Passing:</strong> Compliance with state inspectoral standards, Megger testing, and final safety certificates.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Inquiry CTA */}
      <section className="band" style={{ background: "#f8f8f8" }}>
        <div className="container glass" style={{ padding: 36, display: "flex", justifyContent: "space-between", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontSize: "1.8rem", margin: "0 0 8px 0" }}>Need a similar setup for your site?</h2>
            <p className="lead" style={{ margin: 0 }}>Consult our engineers for load distribution calculations, panel fabrication layout, and utility approvals.</p>
          </div>
          <Link className="btn btn-primary" href={`/contact?service=${encodeURIComponent(project.category)}`}>
            Get Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
