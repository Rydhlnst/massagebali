import Image from "next/image";
import { HomeNav } from "./home-nav";
import { getProducts, getSettings } from "@/lib/data/catalog";
import { PriceList } from "./price-list";
import { WhatsAppFloat } from "./whatsapp-float";

const images = { hero: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85", intro: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85", room: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1000&q=85" };
function Photo({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) { return <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 768px) 100vw, 50vw" className="editorial-image" />; }
const money = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

export default async function Home() {
  const [settings, products] = await Promise.all([getSettings(), getProducts()]);
  const groupedProducts = products.filter((product) => product.isActive).reduce<Record<string, typeof products>>((groups, product) => { (groups[product.category] ??= []).push(product); return groups; }, {});
  const whatsapp = `https://wa.me/62${settings.whatsapp.replace(/^0/, "")}`;
  const structuredData = { "@context": "https://schema.org", "@type": "MassageBusiness", name: settings.spaName, description: settings.heroSubtitle, areaServed: settings.address, telephone: settings.whatsapp, serviceType: "Home service massage" };
  return <main id="top"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><HomeNav spaName={settings.spaName} />
    <section className="hero" aria-labelledby="hero-title"><div className="hero-images"><div className="hero-side hero-side-left image-frame"><Photo src={images.hero} alt="Massage treatment at home" /></div><div className="hero-center image-frame"><Photo src={images.intro} alt="Warm, calm wellness interior" priority /></div><div className="hero-side hero-side-right image-frame"><Photo src={images.room} alt="Relaxing massage room" /></div></div><div className="hero-copy"><p className="eyebrow">{settings.serviceMode}</p><h1 id="hero-title">{settings.heroTitle}</h1><p>{settings.heroSubtitle}</p><a className="editorial-button" href={whatsapp} target="_blank" rel="noreferrer">Book on WhatsApp</a></div></section>
    <section className="intro-grid" id="about" aria-labelledby="intro-title"><div className="intro-copy"><p className="eyebrow">{settings.spaName}</p><h2 id="intro-title">Relax your<br />body.<br /><em>Refresh your mind.</em></h2><p className="intro-description">Professional home service massage for guests in {settings.address}. Choose your treatment, your time, and let our therapist come to you.</p></div><div className="intro-image image-frame"><Photo src={images.intro} alt="Serene warm-toned wellness interior" /></div></section>
    <section className="services-grid" id="services" aria-label="Massage services"><div className="service-image image-frame"><Photo src={images.hero} alt="Professional massage treatment" /></div><div className="service-copy"><h3>Home service<br />massage</h3><p>Our massage menu is designed for deep rest, recovery, and feeling refreshed without leaving your space.</p><a href="#prices" className="service-link">View pricelist <span aria-hidden="true">↗</span></a></div><div className="service-image image-frame"><Photo src={images.room} alt="Comfortable treatment room" /></div></section>\n    <PriceList products={products} />\n    <section className="booking-cta" id="booking" aria-labelledby="booking-title"><p className="eyebrow">{settings.address}</p><h2 id="booking-title">A massage,<br /><em>where you are.</em></h2><p>Message us to check availability and book your home service appointment.</p><a className="editorial-button" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp {settings.whatsapp}</a></section>
    <footer className="site-footer" id="contact"><div className="footer-brand"><span className="footer-logo-art"><Image src="/massage-bali-logo.png" alt={settings.spaName} fill sizes="220px" /></span><p>{settings.serviceMode}. {settings.address}.</p></div><div><p className="eyebrow">Explore</p><a href="#services">Services</a><a href="#prices">Pricelist</a><a href="#booking">Book now</a></div><div><p className="eyebrow">Contact</p><p>{settings.address}<br />WhatsApp {settings.whatsapp}</p></div><div className="footer-bottom"><span>© 2026 {settings.spaName}</span><span>Home service massage only</span><span><a href="/dashboard">Dashboard</a></span></div></footer>
    <WhatsAppFloat />
  </main>;
}








