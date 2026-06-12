import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/common/JsonLd";
import { brand } from "@/constants/site";
import { pageSeo } from "@/lib/seo";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";

export const metadata = pageSeo(
  "Contact Siddhi Electricals",
  "Get in touch with Siddhi Electricals. Request an electrical installation quote, coordinate meter passing passing inspections, or book safety surveys in Mumbai."
);

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": brand.name,
      "telephone": brand.phone,
      "email": brand.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Mumbai, Maharashtra, India"
      }
    }
  };

  return (
    <>
      <JsonLd data={contactSchema} />

      <PageHero
        eyebrow="Get In Touch"
        title="Start Your Inquiry or Request a Survey"
        description="Share your connected load, utility connection target, or custom panel parameters. Our engineers coordinate safety tests and supply detailed quotations."
      />

      <section className="band">
        <div className="container split" style={{ alignItems: "start" }}>
          {/* Inquiry Form */}
          <div>
            <SectionHeader eyebrow="Inquiry Form" title="Submit Your Project Details" />
            <div style={{ marginTop: 24 }}>
              <ContactForm />
            </div>
          </div>

          {/* Quick Contact & Map */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Brand Info Card */}
            <div className="glass" style={{ padding: 24 }}>
              <h2 style={{ fontSize: "1.4rem", margin: "0 0 16px 0", color: "#1a1a1a" }}>{brand.name}</h2>
              
              <div style={{ display: "grid", gap: 14 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <MapPin size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: "0.95rem", color: "#4c5754", lineHeight: 1.4 }}>{brand.address}</span>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Phone size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <a href={`tel:${brand.phone.replaceAll(" ", "")}`} style={{ fontSize: "0.95rem", color: "#1a1a1a", fontWeight: 700 }}>
                    {brand.phone}
                  </a>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Mail size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <a href={`mailto:${brand.email}`} style={{ fontSize: "0.95rem", color: "#1a1a1a", fontWeight: 700 }}>
                    {brand.email}
                  </a>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Clock size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: "0.95rem", color: "#4c5754", lineHeight: 1.4 }}>
                    Monday to Saturday<br />
                    9:00 AM to 7:00 PM
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                <a className="btn btn-primary" href={`tel:${brand.phone.replaceAll(" ", "")}`} style={{ flex: 1, minHeight: 40, fontSize: "0.85rem", gap: 6 }}>
                  <Phone size={14} /> Call Now
                </a>
                <a className="btn btn-secondary" href={`https://wa.me/${brand.phone.replace("+", "").replaceAll(" ", "")}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, minHeight: 40, fontSize: "0.85rem", gap: 6 }}>
                  <MessageSquare size={14} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Google Map Premium Placeholder */}
            <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", border: "1px solid #dde8e4", height: 260 }}>
              {/* Iframe embedding a standard map of Mumbai, Maharashtra */}
              <iframe
                title="Siddhi Electricals Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120615.72236357068!2d72.825769!3d19.082522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1718163500000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
