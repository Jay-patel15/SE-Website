export function FloatingWhatsApp() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

  return (
    <a className="floating-wa" href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">
      WhatsApp
    </a>
  );
}
