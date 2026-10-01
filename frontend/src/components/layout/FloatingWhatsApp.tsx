"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, MessageCircle } from "lucide-react";
import { brand } from "@/constants/site";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {pathname?.startsWith("/calculators") ? null : (
        <Link className="floating-calc" href="/calculators" aria-label="Open electrical calculators">
          <Calculator size={20} />
          <span>Calculators</span>
        </Link>
      )}
      <a className="floating-wa" href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
        <MessageCircle size={26} />
      </a>
    </>
  );
}
