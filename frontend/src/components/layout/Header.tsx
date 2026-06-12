"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { brand, calculators, navItems } from "@/constants/site";
import { Menu, X, ChevronDown, Calculator, ArrowRight } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  return (
    <header
      className="nav-shell"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 500,
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(13, 123, 95, 0.08)",
        transition: "background 300ms ease"
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          minHeight: 76,
          alignItems: "center",
          justifyContent: "space-between",
          gap: 18,
          padding: "10px 0"
        }}
      >
        {/* Brand Logo */}
        <Link href="/" aria-label="Siddhi Electricals home" style={{ zIndex: 600 }}>
          <Image
            src={brand.logoWide}
            alt="Siddhi Electricals"
            width={220}
            height={56}
            priority
            style={{ height: 48, width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* Desktop Navigation Link Menu */}
        <nav
          className="desktop-only"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24
          }}
        >
          {navItems.map((item) => {
            if (item.label === "Tools") {
              return (
                <div
                  key={item.href}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setToolsDropdownOpen(true)}
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                >
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      fontWeight: 800,
                      color: "var(--foreground)",
                      fontSize: "0.95rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      cursor: "pointer",
                      padding: "10px 0"
                    }}
                  >
                    Tools <ChevronDown size={14} color="#8c9794" />
                  </button>

                  {/* Dropdown Menu */}
                  {toolsDropdownOpen && (
                    <div
                      className="glass dropdown-menu"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 280,
                        background: "rgba(255, 255, 255, 0.98)",
                        boxShadow: "0 20px 48px rgba(9, 45, 36, 0.15)",
                        borderRadius: 12,
                        padding: 12,
                        display: "grid",
                        gap: 4,
                        border: "1px solid rgba(13, 123, 95, 0.12)"
                      }}
                    >
                      {calculators.slice(0, 6).map((calc) => {
                        const Icon = calc.icon;
                        return (
                          <Link
                            key={calc.slug}
                            href={`/calculators/${calc.slug}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              padding: "10px 12px",
                              borderRadius: 8,
                              fontSize: "0.85rem",
                              color: "#2c3e39",
                              fontWeight: 700,
                              transition: "background 150ms ease"
                            }}
                            className="dropdown-item"
                          >
                            <Icon size={16} color="var(--accent)" />
                            {calc.title.replace(" Calculator", "")}
                          </Link>
                        );
                      })}
                      <div style={{ borderTop: "1px solid #eaeaea", marginTop: 6, paddingTop: 6 }}>
                        <Link
                          href="/calculators"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "8px 12px",
                            fontSize: "0.85rem",
                            color: "var(--primary)",
                            fontWeight: 800
                          }}
                        >
                          All 12 Calculators <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontWeight: 800,
                  color: "var(--foreground)",
                  fontSize: "0.95rem",
                  transition: "color 150ms ease"
                }}
                className="nav-link"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Quote Button */}
        <div className="desktop-only">
          <Link className="btn btn-primary" href="/contact" style={{ minHeight: 40, fontSize: "0.9rem" }}>
            Get Quote
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            zIndex: 600,
            background: "none",
            border: "none",
            color: "var(--foreground)",
            cursor: "pointer",
            padding: 8
          }}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Panel Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: "fixed",
            top: 76,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 450,
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            overflowY: "auto",
            borderTop: "1px solid #eaeaea",
            animation: "fadeIn 200ms ease-in-out forwards"
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--foreground)",
                borderBottom: "1px solid #f0f0f0",
                paddingBottom: 10
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="btn btn-primary"
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{ width: "100%", marginTop: 10 }}
          >
            Get Free Quote
          </Link>
        </div>
      )}

      {/* Styled inline media queries block */}
      <style jsx global>{`
        /* Desktop link hover actions */
        .nav-link:hover {
          color: var(--primary) !important;
        }
        .dropdown-item:hover {
          background: #f4f8f6;
          color: var(--primary) !important;
        }

        /* Screen display conditions */
        @media (min-width: 901px) {
          .mobile-only {
            display: none !important;
          }
        }
        @media (max-width: 900px) {
          .desktop-only {
            display: none !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
