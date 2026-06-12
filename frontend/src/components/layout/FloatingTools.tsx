"use client";

import { useState } from "react";
import Link from "next/link";
import { calculators } from "@/constants/site";
import { Calculator, X, Settings, ArrowRight } from "lucide-react";

export function FloatingTools() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn"
        aria-label="Access electrical tools"
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          zIndex: 400,
          borderRadius: 9999,
          width: 58,
          height: 58,
          minHeight: 58,
          padding: 0,
          background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
          color: "white",
          boxShadow: "0 18px 36px rgba(13, 123, 95, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
          transition: "transform 200ms ease, background 200ms ease"
        }}
      >
        {isOpen ? <X size={26} /> : <Calculator size={26} />}
      </button>

      {/* Slide-over Panel (Drawer) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 350,
            background: "rgba(9, 45, 36, 0.45)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(100%, 390px)",
              height: "100%",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.15)",
              display: "flex",
              flexDirection: "column",
              padding: 24,
              overflowY: "auto",
              animation: "slideIn 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eaeaea", paddingBottom: 16, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ background: "rgba(13, 123, 95, 0.1)", color: "var(--primary)", padding: 8, borderRadius: 8 }}>
                  <Settings size={22} className="spin-slow" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 900, color: "#1a1a1a" }}>Engineering Tools</h3>
                  <span style={{ fontSize: "0.75rem", color: "#8c9794", fontWeight: 700 }}>Quick Sizing &amp; Estimations</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: "none", border: "none", color: "#8c9794", cursor: "pointer", padding: 4 }}
              >
                <X size={20} />
              </button>
            </div>

            {/* List of Calculators */}
            <div style={{ display: "grid", gap: 10 }}>
              {calculators.map((calc) => {
                const Icon = calc.icon;
                return (
                  <Link
                    key={calc.slug}
                    href={`/calculators/${calc.slug}`}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 14px",
                      borderRadius: 8,
                      border: "1px solid #eef2f0",
                      background: "white",
                      transition: "transform 150ms ease, border 150ms ease, box-shadow 150ms ease"
                    }}
                    className="drawer-calc-item"
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ color: "var(--accent)" }}>
                        <Icon size={20} />
                      </div>
                      <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#2c3e39" }}>
                        {calc.title.replace(" Calculator", "")}
                      </span>
                    </div>
                    <ArrowRight size={14} color="#8c9794" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Styled animation blocks */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .drawer-calc-item:hover {
          transform: translateY(-2px);
          border-color: var(--primary) !important;
          box-shadow: 0 6px 16px rgba(13, 123, 95, 0.08);
        }
        .spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
