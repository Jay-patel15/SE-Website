import type { MetadataRoute } from "next";
import { brand, calculators, navItems, projects, services } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...navItems.map((item) => item.href),
    ...services.map((item) => `/services/${item.slug}`),
    ...projects.map((item) => `/projects/${item.slug}`),
    ...calculators.map((item) => `/calculators/${item.slug}`),
    "/gallery"
  ];

  return routes.map((route) => ({
    url: `${brand.url}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    priority: route === "/" ? 1 : route.split("/").length > 2 ? 0.6 : 0.8
  }));
}
