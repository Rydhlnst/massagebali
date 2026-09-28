"use client";
import { FaWhatsapp } from "react-icons/fa";
export function WhatsAppFloat({ whatsapp }: { whatsapp: string }) {
  const href = `https://wa.me/62${whatsapp.replace(/^0/, "")}?text=${encodeURIComponent("Hello Massage Bali, I would like to book a home service massage.")}`;
  return <a className="whatsapp-float" href={href} target="_blank" rel="noreferrer" aria-label="Book Massage Bali on WhatsApp"><FaWhatsapp aria-hidden="true" /><span>Book now</span></a>;
}
