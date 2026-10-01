type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
};

export function SectionHeader({ eyebrow, title, description, center }: SectionHeaderProps) {
  return (
    <div className={center ? "section-head center" : "section-head"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {description ? <p className="lead">{description}</p> : null}
    </div>
  );
}
