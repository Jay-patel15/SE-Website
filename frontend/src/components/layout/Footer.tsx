import Link from "next/link";
import { brand, navItems } from "@/constants/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container grid grid-3">
        <div>
          <h2>{brand.name}</h2>
          <p className="lead" style={{ color: "#cfe3dc" }}>{brand.tagline}</p>
        </div>
        <div>
          <h3>Company</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </div>
        </div>
        <div>
          <h3>Contact</h3>
          <p>{brand.address}</p>
          <p>{brand.phone}</p>
          <p>{brand.email}</p>
        </div>
      </div>
      <div className="container" style={{ borderTop: "1px solid rgba(255,255,255,.16)", marginTop: 36, paddingTop: 22, color: "#cfe3dc" }}>
        © {new Date().getFullYear()} Siddhi Electricals. All rights reserved.
      </div>
    </footer>
  );
}
