"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

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

type ProjectsClientProps = {
  initialProjects: Project[];
};

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Industrial", "Commercial", "Home Automation", "CCTV"];

  const filteredProjects = activeCategory === "All"
    ? initialProjects
    : initialProjects.filter(p => p.category === activeCategory);

  return (
    <div style={{ marginTop: 30 }}>
      {/* Category Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 40 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="btn"
            style={{
              minHeight: 38,
              padding: "0 18px",
              fontSize: "0.9rem",
              background: activeCategory === cat ? "var(--primary)" : "white",
              color: activeCategory === cat ? "white" : "var(--foreground)",
              border: `1px solid ${activeCategory === cat ? "var(--primary)" : "#cfded9"}`,
              boxShadow: activeCategory === cat ? "0 8px 20px rgba(13, 123, 95, 0.2)" : "none"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-2">
        {filteredProjects.map((project) => (
          <article
            className="card media-card"
            key={project.slug}
            style={{
              display: "grid",
              gridTemplateRows: "250px auto",
              transition: "transform 200ms ease, box-shadow 200ms ease"
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={project.image}
                alt={project.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <span
                style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  background: "var(--primary)",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: 4,
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  textTransform: "uppercase"
                }}
              >
                {project.category}
              </span>
            </div>
            
            <div className="media-card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
              <div>
                <h3 style={{ fontSize: "1.45rem", margin: "0 0 10px 0", color: "#1a1a1a" }}>{project.name}</h3>
                
                <div style={{ display: "flex", gap: 16, fontSize: "0.85rem", color: "#8c9794", fontWeight: 700, marginBottom: 14 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <MapPin size={14} color="var(--primary)" /> {project.location}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Calendar size={14} color="var(--primary)" /> {project.completion}
                  </span>
                </div>

                <p style={{ fontSize: "0.95rem", color: "#4c5754", lineHeight: 1.6, marginBottom: 20 }}>
                  <strong>Scope:</strong> {project.scope}
                </p>
              </div>

              <Link
                href={`/projects/${project.slug}`}
                style={{
                  color: "var(--primary)",
                  fontWeight: 900,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: "auto"
                }}
              >
                View Case Study <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#8c9794" }}>
          No projects found in this category.
        </div>
      )}
    </div>
  );
}
