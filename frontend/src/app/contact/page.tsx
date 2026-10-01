import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/common/PageHero";
import { brand } from "@/constants/site";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo(
  "Contact Us",
  "Contact Siddhi Electricals for an electrical installation quote, Adani / Tata Power / BEST meter passing, or a site safety survey in Mumbai.",
  "/contact"
);

type PageProps = { searchParams: Promise<{ service?: string }> };

export default async function ContactPage({ searchParams }: PageProps) {
  const { service } = await searchParams;
  const tel = `tel:${brand.phone.replaceAll(" ", "")}`;

  const details = [
    { icon: Phone, label: "Call us", value: brand.phone, href: tel },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with an engineer", href: `https://wa.me/${brand.whatsapp}` },
    { icon: Mail, label: "Email", value: brand.email, href: `mailto:${brand.email}` },
    { icon: MapPin, label: "Location", value: brand.address },
    { icon: Clock, label: "Working hours", value: brand.hours }
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact", href: "/contact" }]}
        eyebrow="Contact"
        title="Let's talk about your project"
        description="Tell us your site type, load requirement and timeline. We usually respond within one working day."
      />

      <section className="band">
        <div className="container split" style={{ alignItems: "start" }}>
          <div className="card" style={{ padding: 32 }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: 6 }}>Request a free quote</h2>
            <p style={{ color: "var(--text)", marginBottom: 24 }}>Fields marked * are required.</p>
            <ContactForm defaultService={service} />
          </div>

          <aside style={{ display: "grid", gap: 16 }}>
            {details.map((d) => {
              const Icon = d.icon;
              const body = (
                <>
                  <span className="icon-badge"><Icon size={22} /></span>
                  <span>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "var(--muted)", fontWeight: 700, textTransform: "uppercase" }}>{d.label}</span>
                    <strong>{d.value}</strong>
                  </span>
                </>
              );
              const style = { display: "flex", gap: 16, alignItems: "center", padding: 20 };
              return d.href ? (
                <a key={d.label} className="card card-hover" href={d.href} style={style} {...(d.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{body}</a>
              ) : (
                <div key={d.label} className="card" style={style}>{body}</div>
              );
            })}
            <div style={{ borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid var(--line)", height: 260 }}>
              <iframe
                title={`${brand.name} location map`}
                src="https://www.google.com/maps?q=Mumbai,Maharashtra&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
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
