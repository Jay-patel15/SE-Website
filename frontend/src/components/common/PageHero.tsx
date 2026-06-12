type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
};

export function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="band dark-band">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1 style={{ maxWidth: 900, margin: "14px 0", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1 }}>
          {title}
        </h1>
        <p className="lead" style={{ maxWidth: 760 }}>{description}</p>
        {actions ? <div className="hero-actions">{actions}</div> : null}
      </div>
    </section>
  );
}
