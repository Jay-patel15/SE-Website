import type { Metadata } from "next";
import { brand } from "@/constants/site";

export function pageSeo(title: string, description: string, path = "/", keywords: string[] = []): Metadata {
  const isHome = title === brand.name;
  const fullTitle = isHome ? `${brand.name} | Electrical Contractor in Mumbai` : `${title} | ${brand.name}`;

  return {
    title: isHome ? { absolute: fullTitle } : title,
    description,
    keywords: [
      "Electrical Contractor Mumbai",
      "Electrical Consultant Mumbai",
      "Industrial Electrical Contractor",
      "Commercial Electrical Contractor",
      "Residential Electrical Contractor",
      "Adani Meter Connection",
      "Tata Power Meter Connection",
      "BEST Meter Passing",
      "CCTV Installation Mumbai",
      "Home Automation Mumbai",
      ...keywords
    ],
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: brand.name,
      images: [{ url: brand.logoWide, width: 1280, height: 401, alt: brand.name }],
      locale: "en_IN",
      type: "website"
    },
    twitter: { card: "summary_large_image", title: fullTitle, description }
  };
}
