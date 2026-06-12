import type { Metadata } from "next";
import { brand } from "@/constants/site";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://siddhielectricals.com";

export function pageSeo(title: string, description: string, keywords: string[] = []): Metadata {
  const fullTitle = title === brand.name ? title : `${title} | ${brand.name}`;

  return {
    title: title === brand.name ? { absolute: brand.name } : title,
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
    alternates: { canonical: baseUrl },
    openGraph: {
      title: fullTitle,
      description,
      url: baseUrl,
      siteName: brand.name,
      images: [{ url: "/brand/siddhi-electricals-logo-wide.jpg", width: 1280, height: 401 }],
      locale: "en_IN",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description
    }
  };
}
