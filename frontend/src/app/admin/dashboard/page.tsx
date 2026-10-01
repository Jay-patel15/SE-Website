"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, FolderKanban, Image as ImageIcon, Inbox, MessageSquareQuote, Plus, Wrench } from "lucide-react";
import { getGallery, getLeads, getProjects, getServices, getTestimonials } from "@/lib/dataClient";

type Counts = { projects: number; gallery: number; leads: number; services: number; testimonials: number };

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([getProjects(), getGallery(), getLeads(), getServices(), getTestimonials()])
      .then(([p, g, l, s, t]) => {
        setCounts({ projects: p.length, gallery: g.length, leads: l.length, services: s.length, testimonials: t.length });
        setRecentLeads(l.slice(0, 5));
      })
      .catch((err) => console.error("Failed to load dashboard", err));
  }, []);

  const tiles = [
    { label: "Leads", key: "leads", href: "/admin/leads", icon: Inbox, orange: true },
    { label: "Projects", key: "projects", href: "/admin/projects", icon: FolderKanban },
    { label: "Gallery photos", key: "gallery", href: "/admin/gallery", icon: ImageIcon },
    { label: "Services", key: "services", href: "/admin/services", icon: Wrench },
    { label: "Testimonials", key: "testimonials", href: "/admin/testimonials", icon: MessageSquareQuote }
  ] as const;

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your website content and enquiries.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="btn btn-ghost btn-sm" href="/admin/gallery?new=1"><Plus size={16} /> Gallery photo</Link>
          <Link className="btn btn-primary btn-sm" href="/admin/projects?new=1"><Plus size={16} /> Project</Link>
        </div>
      </div>

      <div className="admin-stats">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <Link key={t.key} href={t.href} className="card admin-stat">
              <span className={`icon-badge${"orange" in t ? " orange" : ""}`}><Icon size={22} /></span>
              <div>
                <strong>{counts ? counts[t.key] : "–"}</strong>
                <span>{t.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="card admin-list">
        <div className="admin-row" style={{ justifyContent: "space-between" }}>
          <strong>Recent enquiries</strong>
          <Link className="link-arrow" href="/admin/leads" style={{ fontSize: "0.9rem" }}>View all <ArrowRight size={16} /></Link>
        </div>
        {!counts ? (
          <div style={{ padding: 20, display: "grid", gap: 10 }}>
            {[0, 1, 2].map((i) => <div key={i} className="skeleton" style={{ height: 44 }} />)}
          </div>
        ) : recentLeads.length === 0 ? (
          <p className="admin-empty">No enquiries yet.</p>
        ) : (
          recentLeads.map((lead) => (
            <div className="admin-row" key={lead.id}>
              <div className="admin-row-main">
                <strong>{lead.name}</strong>
                <span>{lead.service} · {lead.phone}</span>
              </div>
              <span className="admin-row-meta">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("en-IN") : ""}</span>
            </div>
          ))
        )}
      </div>
    </>
  );
}
