"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { brand, navItems, services } from "@/constants/site";

export function Footer() {
  if (usePathname()?.startsWith("/admin")) return null;

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="footer-logo" aria-label={`${brand.name} home`}>
            <Image src={brand.logoWide} alt={brand.name} width={128} height={40} />
          </Link>
          <p>{brand.tagline}. Licensed electrical contracting and consultancy for industrial, commercial and residential projects across Mumbai.</p>
        </div>
        <div>
          <h3>Services</h3>
          <ul>
            {services.slice(0, 6).map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3>Company</h3>
          <ul>
            {navItems.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}
            <li><Link href="/gallery">Gallery</Link></li>
          </ul>
        </div>
        <div>
          <h3>Get in touch</h3>
          <ul className="footer-contact">
            <li><Phone size={16} /><a href={`tel:${brand.phone.replaceAll(" ", "")}`}>{brand.phone}</a></li>
            <li><Mail size={16} /><a href={`mailto:${brand.email}`}>{brand.email}</a></li>
            <li><MapPin size={16} /><span>{brand.address}</span></li>
            <li><Clock size={16} /><span>{brand.hours}</span></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
        <span>Govt. Licensed Electrical Contractor · Mumbai</span>
      </div>
    </footer>
  );
}
