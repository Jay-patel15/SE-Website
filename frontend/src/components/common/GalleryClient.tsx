"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { canOptimizeImage, getGallery } from "@/lib/dataClient";

type GalleryItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  desc: string;
};

export function GalleryClient() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  useEffect(() => {
    getGallery().then(setItems).catch((e) => console.error("Failed to load dynamic gallery", e));
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))];
  const filtered = activeCategory === "All" ? items : items.filter((i) => i.category === activeCategory);

  return (
    <>
      <div className="filter-row" role="group" aria-label="Filter gallery">
        {categories.map((cat) => (
          <button key={cat} className="filter-btn" aria-pressed={activeCategory === cat} onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-3">
        {filtered.map((item) => (
          <button
            key={item.id}
            className="card media-card card-hover"
            onClick={() => setSelected(item)}
            style={{ textAlign: "left", font: "inherit", color: "inherit", cursor: "zoom-in" }}
            aria-label={`View ${item.title}`}
          >
            <span className="media" style={{ display: "block", width: "100%" }}>
              <Image unoptimized={!canOptimizeImage(item.image)} src={item.image} alt={item.title} fill sizes="(max-width: 720px) 100vw, 33vw" style={{ objectFit: "cover" }} />
              <span className="tag" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><ZoomIn size={12} /> {item.category}</span>
            </span>
            <span className="media-card-body">
              <strong style={{ fontSize: "1.1rem" }}>{item.title}</strong>
              <span style={{ color: "var(--text)", fontSize: "0.9rem" }}>{item.desc}</span>
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          onClick={() => setSelected(null)}
          style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(7,47,39,0.92)", display: "grid", placeItems: "center", padding: 24 }}
        >
          <button onClick={() => setSelected(null)} aria-label="Close" style={{ position: "absolute", top: 20, right: 20, background: "none", border: 0, color: "white", cursor: "pointer" }}>
            <X size={32} />
          </button>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(100%, 900px)", textAlign: "center", color: "white" }}>
            <div style={{ position: "relative", height: "min(70vh, 560px)", borderRadius: 14, overflow: "hidden" }}>
              <Image unoptimized={!canOptimizeImage(selected.image)} src={selected.image} alt={selected.title} fill sizes="900px" style={{ objectFit: "contain" }} />
            </div>
            <h2 style={{ margin: "18px 0 6px", fontSize: "1.4rem" }}>{selected.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>{selected.desc}</p>
          </div>
        </div>
      )}
    </>
  );
}
