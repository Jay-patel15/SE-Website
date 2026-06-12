"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X } from "lucide-react";

type GalleryItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  desc: string;
};

const items: GalleryItem[] = [
  {
    id: 1,
    title: "LT Distribution Panel",
    category: "Panels",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80",
    desc: "3-phase custom fabricated power distribution panel installation."
  },
  {
    id: 2,
    title: "HT Cable Laying",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    desc: "Heavy armored HT cable trenching and routing for a manufacturing plant."
  },
  {
    id: 3,
    title: "Commercial CCTV Array",
    category: "CCTV",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    desc: "Multi-angle IP dome camera configuration connected to central NVR."
  },
  {
    id: 4,
    title: "Home Automation Console",
    category: "Automation",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    desc: "IoT touch control panel for centralized lighting and security settings."
  },
  {
    id: 5,
    title: "Adani Utility Meter Setup",
    category: "Meter Work",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    desc: "Multi-meter installation board passing inspectoral safety approval."
  },
  {
    id: 6,
    title: "Double Earthing System",
    category: "Safety",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    desc: "Copper plate earthing assembly with chamber for grounding safety."
  },
  {
    id: 7,
    title: "Automatic Changeover Switch",
    category: "Panels",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80",
    desc: "AMF panel layout for seamless utility-to-generator power transfer."
  },
  {
    id: 8,
    title: "Plant Earth Resistance Test",
    category: "Safety",
    image: "https://images.unsplash.com/photo-1565608438257-fac3c27beb36?auto=format&fit=crop&w=800&q=80",
    desc: "Megger compliance inspection measuring grounding loop integrity."
  }
];

export function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = ["All", "Panels", "Industrial", "CCTV", "Automation", "Meter Work", "Safety"];

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter(item => item.category === activeCategory);

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

      {/* Gallery Grid */}
      <div className="grid grid-3">
        {filteredItems.map((item) => (
          <article
            className="card media-card"
            key={item.id}
            onClick={() => setSelectedImage(item)}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              cursor: "pointer",
              transition: "transform 200ms ease"
            }}
          >
            <div style={{ position: "relative", minHeight: 220, width: "100%", overflow: "hidden" }} className="media-hover-trigger">
              <Image
                src={item.image}
                alt={item.title}
                fill
                style={{ objectFit: "cover", transition: "transform 300ms ease" }}
                sizes="(max-width: 900px) 100vw, 33vw"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(13, 123, 95, 0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 200ms ease"
                }}
                className="hover-overlay"
              >
                <ZoomIn size={32} color="white" />
              </div>
            </div>
            
            <div className="media-card-body">
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {item.category}
              </span>
              <h3 style={{ margin: "4px 0", fontSize: "1.2rem", color: "#1a1a1a" }}>{item.title}</h3>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#4c5754", lineHeight: 1.4 }}>{item.desc}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Styled inline style block to make hover work easily */}
      <style jsx global>{`
        .media-hover-trigger:hover .hover-overlay {
          opacity: 1 !important;
        }
        .media-hover-trigger:hover img {
          transform: scale(1.05);
        }
      `}</style>

      {/* Image Modal Lightbox */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24
          }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer"
            }}
          >
            <X size={32} />
          </button>
          
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(100%, 750px)",
              height: "min(70vh, 500px)",
              borderRadius: 8,
              overflow: "hidden"
            }}
          >
            <Image
              src={selectedImage.image}
              alt={selectedImage.title}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              marginTop: 18,
              textAlign: "center",
              color: "white",
              maxWidth: 550
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 800, textTransform: "uppercase" }}>
              {selectedImage.category}
            </span>
            <h3 style={{ margin: "6px 0", fontSize: "1.5rem" }}>{selectedImage.title}</h3>
            <p style={{ margin: 0, color: "#d9eee7", fontSize: "0.95rem" }}>{selectedImage.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
