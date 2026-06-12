import { PageHero } from "@/components/common/PageHero";
import { GalleryClient as GalleryComponent } from "@/components/common/GalleryClient";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo(
  "Project Gallery",
  "Visual portfolio of panel fabrication, industrial cabling, utility installations, and CCTV surveillance execution by Siddhi Electricals."
);

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Visual Portfolio"
        title="Our Execution Gallery"
        description="A curated look at our on-site wiring safety, custom control panel builds, electrical audits, and smart installation checkouts."
      />

      <section className="band">
        <div className="container">
          <GalleryComponent />
        </div>
      </section>
    </>
  );
}
