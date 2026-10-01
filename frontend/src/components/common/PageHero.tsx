import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { brand } from "@/constants/site";

type Crumb = { label: string; href: string };

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  crumbs?: Crumb[];
};

export function PageHero({ eyebrow, title, description, actions, crumbs }: PageHeroProps) {
  const trail = crumbs ? [{ label: "Home", href: "/" }, ...crumbs] : null;

  return (
    <section className="page-hero">
      {trail ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: trail.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${brand.url}${c.href === "/" ? "" : c.href}` }))
          }}
        />
      ) : null}
      <div className="container">
        {trail ? (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            {trail.map((c, i) => (
              <span key={c.href}>
                {i < trail.length - 1 ? <><Link href={c.href}>{c.label}</Link> /</> : c.label}
              </span>
            ))}
          </nav>
        ) : null}
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        {actions ? <div className="hero-actions">{actions}</div> : null}
      </div>
    </section>
  );
}
