import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/common/JsonLd";
import { brand, services } from "@/constants/site";
import "./globals.css";

const font = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: { default: `${brand.name} | Electrical Contractor in Mumbai`, template: `%s | ${brand.name}` },
  description: "Government licensed electrical contractor in Mumbai for industrial, commercial and residential projects, Adani / Tata Power / BEST meter passing, panels, CCTV and home automation.",
  icons: { icon: brand.logoBulb, apple: brand.logoBulb },
  formatDetection: { telephone: true }
};

export const viewport: Viewport = { themeColor: "#11745e" };

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  "@id": `${brand.url}/#business`,
  name: brand.name,
  slogan: brand.tagline,
  url: brand.url,
  logo: `${brand.url}${brand.logoWide}`,
  image: `${brand.url}${brand.logoWide}`,
  telephone: brand.phone,
  email: brand.email,
  priceRange: "₹₹",
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 19.076, longitude: 72.8777 },
  areaServed: ["Mumbai", "Thane", "Navi Mumbai"],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00"
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Electrical services",
    itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, url: `${brand.url}/services/${s.slug}` } }))
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={font.variable}>
      <body>
        <JsonLd data={businessSchema} />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
