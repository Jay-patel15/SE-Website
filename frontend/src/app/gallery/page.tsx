import { CtaBand } from "@/components/common/CtaBand";
import { GalleryClient } from "@/components/common/GalleryClient";
import { PageHero } from "@/components/common/PageHero";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo(
  "Gallery",
  "Photos of electrical panels, industrial cabling, meter installations, earthing and CCTV work executed by Siddhi Electricals.",
  "/gallery"
);

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Gallery", href: "/gallery" }]}
        eyebrow="Gallery"
        title="Our work on site"
        description="A look at our panel builds, cabling, meter boards, earthing systems and smart installations."
      />
      <section className="band">
        <div className="container">
          <GalleryClient />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
