import type { MetadataRoute } from "next";
import { calculators, navItems, projects, services } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://siddhielectricals.com";
  const routes = [
    ...navItems.map((item) => item.href),
    ...services.map((item) => `/services/${item.slug}`),
    ...projects.map((item) => `/projects/${item.slug}`),
    ...calculators.map((item) => `/calculators/${item.slug}`),
    "/gallery"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
