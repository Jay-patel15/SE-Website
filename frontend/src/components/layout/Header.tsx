"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { brand, navItems } from "@/constants/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));
  const tel = `tel:${brand.phone.replaceAll(" ", "")}`;

  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="logo" aria-label={`${brand.name} home`}>
          <Image src={brand.logoWide} alt={brand.name} width={172} height={54} priority />
        </Link>

        <nav className="nav" aria-label="Main">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="btn btn-primary btn-sm" href="/contact">Get a Quote</Link>
          <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label="Toggle menu">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" className="mobile-nav" data-open={open} aria-label="Mobile">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
        <a className="btn btn-secondary" href={tel}><Phone size={16} /> Call {brand.phone}</a>
        <Link className="btn btn-primary" href="/contact">Get a Free Quote</Link>
      </nav>
    </header>
  );
}
