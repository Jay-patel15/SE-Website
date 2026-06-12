import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { JsonLd } from "@/components/common/JsonLd";
import { blogPosts, downloads } from "@/constants/site";
import { pageSeo } from "@/lib/seo";
import { ArrowLeft, Download, PhoneCall } from "lucide-react";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return pageSeo(
    post?.title || "Blog Post",
    post?.summary || "Read electrical guidelines and articles."
  );
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

function getArticleBody(slug: string) {
  switch (slug) {
    case "adani-meter-process":
      return {
        introduction: "Securing a new connection or upgrading a load with Adani Electricity in Mumbai requires following a structured document collection and submission flow. Failing to provide compliant wiring testing reports is the leading cause of inspection delays.",
        sections: [
          {
            title: "1. Mandatory Documents Check",
            content: "Before applying, gather proof of ownership (sale deed or tax receipt), NOC from the housing society, authorized ID proof, and a Test Report signed by a licensed electrical contractor detailing load balance."
          },
          {
            title: "2. Load Calculations & Site Inspection",
            content: "Adani inspectors visit the site to check spacing on the meter board, vertical clearances, and main feeder cable size. Ensure your cable size matches the requested load enhancement to prevent inspection failure."
          },
          {
            title: "3. Installation of Busbar & Cut-outs",
            content: "A standard Adani meter assembly requires an approved busbar chamber, main switch-fuses, and double earthing connected directly to the meter box shell."
          }
        ]
      };
    case "tata-power-connection-guide":
      return {
        introduction: "Tata Power provides highly reliable residential and industrial power connections in Mumbai. Preparing your site boards and liaisoning documents correctly guarantees a faster meter installation turnaround.",
        sections: [
          {
            title: "1. Online Submission & A1 Form",
            content: "Start by submitting Tata Power's A1 application form. You must list the total connected load in KW/KVA and name your licensed contractor who will certify the wiring installations."
          },
          {
            title: "2. Cable Termination and Earthing Chambers",
            content: "Tata Power mandates dedicated earthing pits for commercial premises. Terminating armored cables with copper lugs and double insulation sleeve checkups are verified during inspection."
          },
          {
            title: "3. Meter Passing Board Spacing",
            content: "Keep a minimum clearance of 1.2 meters from floor level for the meter board. The layout should be damp-free, easily accessible, and protected from overhead water lines."
          }
        ]
      };
    case "best-meter-passing-guide":
      return {
        introduction: "BEST provides electricity services across Mumbai island. Passing their inspections involves strict compliance with heritage building guidelines and standard board grounding regulations.",
        sections: [
          {
            title: "1. Traditional Meter Board Readiness",
            content: "BEST boards are traditionally made of treated wood or fireproof panels. Ensure all connections use heavy bakelite insulators and are mounted on solid wall surfaces."
          },
          {
            title: "2. Load Assessment and Testing Reports",
            content: "You must supply a certified wiring tester report showing insulation resistance above 1 Megohm. Unbalanced loads across 3 phases are rejected immediately."
          },
          {
            title: "3. Connection Passing Checklist",
            content: "Check main cut-out ratings, verify correct cable size, clear the surrounding space of combustible materials, and verify society NOC forms are stamped."
          }
        ]
      };
    case "electrical-safety":
      return {
        introduction: "Regular safety reviews are critical to preventing shock, fires, and equipment shutdowns in commercial and industrial establishments.",
        sections: [
          {
            title: "1. Run Infrared Thermography Audits",
            content: "Hot spots in panels indicate loose cable terminations or overload conditions. Regular thermography detects faults before they lead to short circuits."
          },
          {
            title: "2. Inspect Residual Current Devices (RCD/ELCB)",
            content: "Verify that ELCBs trip within 30ms under fault conditions. Test the manual trip button monthly to ensure internal springs aren't jammed."
          },
          {
            title: "3. Check Phase Load Balancing",
            content: "Unbalanced phases cause neutral conductor overheating. Measure current draw on R, Y, B phases regularly to balance load changes."
          }
        ]
      };
    default:
      return {
        introduction: "Proper engineering planning, material selection, and licensed contractor execution are key factors in maintaining safe electrical infrastructure on any premises.",
        sections: [
          {
            title: "1. Right-size Cabling and Protection",
            content: "Always calculate voltage drop over distance. Cable thickness must handle running current plus a safety factor, protected by correctly rated MCBs/MCCBs."
          },
          {
            title: "2. Standard Earthing Protocols",
            content: "Grounding paths must offer less than 1-2 Ohms resistance. Test earth pits annually during dry seasons to check soil moisture and conductivity."
          },
          {
            title: "3. Regular Preventative Maintenance",
            content: "Tighten panel connections, clean dust accumulation, check relay functions, and replace warning decals to keep systems compliant and functional."
          }
        ]
      };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  const article = getArticleBody(slug);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.summary,
    "author": {
      "@type": "Organization",
      "name": "Siddhi Electricals"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Siddhi Electricals",
      "logo": {
        "@type": "ImageObject",
        "url": "https://siddhielectricals.com/brand/siddhi-electricals-logo-wide.jpg"
      }
    },
    "datePublished": "2026-06-12",
    "mainEntityOfPage": `https://siddhielectricals.com/blog/${post.slug}`
  };

  return (
    <>
      <JsonLd data={blogSchema} />

      <PageHero
        eyebrow={`Guide - ${post.category}`}
        title={post.title}
        description={post.summary}
      />

      <article className="band" style={{ background: "#ffffff" }}>
        <div className="container" style={{ marginBottom: 20 }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--primary)", fontWeight: 800, marginBottom: 20 }}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>

        <div className="container split">
          {/* Main Article Body */}
          <div className="card" style={{ padding: "30px 40px" }}>
            <p className="lead" style={{ fontWeight: 700, borderBottom: "1px solid #eaeaea", paddingBottom: 24, marginBottom: 24 }}>
              {article.introduction}
            </p>

            <div style={{ display: "grid", gap: 28 }}>
              {article.sections.map((section, idx) => (
                <div key={idx}>
                  <h3 style={{ fontSize: "1.35rem", color: "#1a1a1a", margin: "0 0 10px 0" }}>{section.title}</h3>
                  <p style={{ color: "#4c5754", fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ background: "#f8f8f8", borderRadius: 8, padding: 24, marginTop: 40, borderLeft: "4px solid var(--accent)", display: "flex", justifyContent: "space-between", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
              <div>
                <h4 style={{ margin: "0 0 4px 0", fontSize: "1.1rem" }}>Need assistance with this process?</h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#4c5754" }}>Our electrical engineers provide consultation, testing reports, and liaisoning.</p>
              </div>
              <Link className="btn btn-secondary" href="/contact" style={{ display: "flex", gap: 8, minHeight: 38, fontSize: "0.85rem" }}>
                <PhoneCall size={14} /> Talk to Specialist
              </Link>
            </div>
          </div>

          {/* Sidebar Downloads */}
          <aside>
            <div className="glass" style={{ padding: 24, position: "sticky", top: 110 }}>
              <h3 style={{ margin: "0 0 12px 0", fontSize: "1.15rem" }}>Related Handouts</h3>
              <p style={{ color: "#4c5754", fontSize: "0.85rem", lineHeight: 1.4, marginBottom: 20 }}>
                Get pdf references and wiring guidelines to share with your site team.
              </p>
              <div style={{ display: "grid", gap: 14 }}>
                {downloads.slice(0, 2).map((dl) => (
                  <div key={dl.title} style={{ borderBottom: "1px solid #eaeaea", paddingBottom: 12 }}>
                    <h4 style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>{dl.title}</h4>
                    <span style={{ fontSize: "0.7rem", color: "#8c9794" }}>Format: {dl.type}</span>
                    <button style={{ background: "none", border: "none", color: "var(--primary)", fontSize: "0.8rem", fontWeight: 900, display: "flex", alignItems: "center", gap: 4, cursor: "pointer", padding: 0, marginTop: 8 }}>
                      <Download size={12} /> Download Reference
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
