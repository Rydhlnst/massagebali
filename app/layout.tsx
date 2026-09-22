import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const editorial = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500"] });
const interfaceFont = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"), alternates: { canonical: "/" }, title: "Massage Bali | Home Service Massage in Canggu", description: "Massage Bali provides professional home service massage in Canggu, Bali. Book your treatment on WhatsApp.", keywords: ["Massage Bali", "home service massage Canggu", "Balinese massage Canggu", "massage Bali"], openGraph: { title: "Massage Bali | Home Service Massage", description: "Professional home service massage in Canggu, Bali.", type: "website", siteName: "Massage Bali" }, twitter: { card: "summary", title: "Massage Bali | Home Service Massage", description: "Professional home service massage in Canggu, Bali." } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className={`${editorial.variable} ${interfaceFont.variable}`}><body>{children}</body></html>; }


