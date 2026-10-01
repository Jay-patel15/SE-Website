import Link from "next/link";
import { Phone } from "lucide-react";
import { brand } from "@/constants/site";

export function CtaBand({ title = "Planning an electrical project?", text = "Share your site type, load and timeline. Our engineers will visit, assess and send a clear quotation." }) {
  return (
    <section className="band">
      <div className="container">
        <div className="cta">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="hero-actions" style={{ marginTop: 0 }}>
            <Link className="btn btn-secondary" href="/contact">Get a Free Quote</Link>
            <a className="btn btn-light" href={`tel:${brand.phone.replaceAll(" ", "")}`}><Phone size={16} /> Call Now</a>
          </div>
        </div>
      </div>
    </section>
  );
}
