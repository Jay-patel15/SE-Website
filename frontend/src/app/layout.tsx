import type { Metadata } from "next";
import { FloatingTools } from "@/components/layout/FloatingTools";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { brand } from "@/constants/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://siddhielectricals.com"),
  title: {
    default: brand.name,
    template: `%s | ${brand.name}`
  },
  description: "Electrical contracting and consultancy for industrial, commercial, and residential projects in Mumbai."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingTools />
      </body>
    </html>
  );
}
