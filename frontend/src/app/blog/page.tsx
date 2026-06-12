import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { blogPosts, downloads } from "@/constants/site";
import { pageSeo } from "@/lib/seo";
import { BookOpen, Download, ArrowRight } from "lucide-react";

export const metadata = pageSeo(
  "Info Centre & Blog",
  "Practical engineering guides, electrical safety guidelines, utility meter passing procedures, and smart home automation tips."
);

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Info Centre"
        title="Practical Guides for Electrical Decisions"
        description="Read our latest engineering articles, utility guidebooks (Adani, Tata, BEST), safety inspection lists, and automation checklists."
      />

      <section className="band">
        <div className="container split">
          {/* Blog Post List */}
          <div>
            <SectionHeader eyebrow="Articles" title="Latest Updates" />
            <div className="grid grid-2" style={{ marginTop: 24 }}>
              {blogPosts.map((post) => (
                <article className="card" key={post.slug} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <span className="pill" style={{ fontSize: "0.75rem", padding: "2px 8px", marginBottom: 12, display: "inline-block" }}>
                      {post.category}
                    </span>
                    <h2 style={{ fontSize: "1.3rem", margin: "4px 0 10px 0", lineHeight: 1.2 }}>
                      <Link href={`/blog/${post.slug}`} style={{ color: "#1a1a1a" }}>{post.title}</Link>
                    </h2>
                    <p style={{ color: "#4c5754", fontSize: "0.9rem", lineHeight: 1.5, margin: "0 0 18px 0" }}>
                      {post.summary}
                    </p>
                  </div>
                  <Link href={`/blog/${post.slug}`} style={{ color: "var(--primary)", fontWeight: 900, display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.9rem", marginTop: "auto" }}>
                    Read Article <ArrowRight size={14} />
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar Downloads */}
          <aside>
            <div className="glass" style={{ padding: 24, position: "sticky", top: 110 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <BookOpen size={20} color="var(--primary)" />
                <h3 style={{ margin: 0, fontSize: "1.2rem" }}>Technical Handouts</h3>
              </div>
              <p style={{ color: "#4c5754", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: 20 }}>
                Download our reference documents for load calculations, safety checklists, and panel planning guidelines.
              </p>
              <div style={{ display: "grid", gap: 14 }}>
                {downloads.map((dl) => (
                  <div key={dl.title} style={{ borderBottom: "1px solid #eaeaea", paddingBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                      <h4 style={{ margin: 0, fontSize: "0.95rem", color: "#1a1a1a" }}>{dl.title}</h4>
                      <span style={{ fontSize: "0.7rem", color: "var(--primary)", fontWeight: 800 }}>{dl.type}</span>
                    </div>
                    <p style={{ margin: "4px 0 8px 0", fontSize: "0.8rem", color: "#8c9794" }}>{dl.description}</p>
                    <button style={{ background: "none", border: "none", color: "var(--primary)", fontSize: "0.8rem", fontWeight: 900, display: "flex", alignItems: "center", gap: 4, cursor: "pointer", padding: 0 }}>
                      <Download size={12} /> Download file
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
