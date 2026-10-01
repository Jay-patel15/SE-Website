"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { canOptimizeImage, getProjects } from "@/lib/dataClient";

type Project = {
  slug: string;
  name: string;
  category: string;
  location: string;
  completion: string;
  scope: string;
  image: string;
  testimonial?: string;
};

export function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeCategory, setActiveCategory] = useState("All");
  // Detail pages are prerendered from site.ts; admin-added projects have none yet
  const hasPage = new Set(initialProjects.map((p) => p.slug));

  useEffect(() => {
    getProjects().then(setProjects).catch((e) => console.error("Failed to load dynamic projects", e));
  }, []);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];
  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <div className="filter-row" role="group" aria-label="Filter projects">
        {categories.map((cat) => (
          <button key={cat} className="filter-btn" aria-pressed={activeCategory === cat} onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-2">
        {filtered.map((project) => (
          <article className="card media-card card-hover" key={project.slug}>
            <div className="media">
              <Image unoptimized={!canOptimizeImage(project.image)} src={project.image} alt={`${project.name}, ${project.location}`} fill sizes="(max-width: 720px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              <span className="tag">{project.category}</span>
            </div>
            <div className="media-card-body">
              <h2 style={{ fontSize: "1.3rem" }}>{project.name}</h2>
              <div style={{ display: "flex", gap: 18, fontSize: "0.875rem", color: "var(--muted)", fontWeight: 600 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><MapPin size={14} color="var(--primary)" /> {project.location}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Calendar size={14} color="var(--primary)" /> {project.completion}</span>
              </div>
              <p style={{ color: "var(--text)" }}>{project.scope}</p>
              {hasPage.has(project.slug) && (
                <Link className="link-arrow" href={`/projects/${project.slug}`} style={{ marginTop: "auto" }}>
                  View project <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && <p style={{ textAlign: "center", color: "var(--muted)" }}>No projects in this category yet.</p>}
    </>
  );
}
