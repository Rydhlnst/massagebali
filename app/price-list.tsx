"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/data/catalog";
import { FaWhatsapp } from "react-icons/fa";

const money = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
const labels: Record<string, string> = { massage: "Massage", facial: "Facial", package: "Packages" };
export function PriceList({ products }: { products: Product[] }) {
  const groups = useMemo(() => products.filter((product) => product.isActive).reduce<Record<string, Product[]>>((result, product) => { (result[product.category] ??= []).push(product); return result; }, {}), [products]);
  const categories = Object.keys(groups); const [active, setActive] = useState(categories[0] ?? "massage");
  const rows = Object.values((groups[active] ?? []).reduce<Record<string, Product[]>>((result, product) => { (result[product.name] ??= []).push(product); return result; }, {}));
  return <section className="price-section compact-prices" id="prices" aria-labelledby="prices-title"><div className="price-heading"><p className="eyebrow">Transparent pricing</p><h2 id="prices-title">Our pricelist</h2><p>Home service massage in Canggu, Bali. Choose a treatment and duration.</p><div className="price-tabs" role="tablist" aria-label="Pricelist categories">{categories.map((category) => <button key={category} type="button" role="tab" aria-selected={active === category} className={active === category ? "active" : ""} onClick={() => setActive(category)}>{labels[category] ?? category}</button>)}</div></div><div className="price-panel">{rows.map((row) => <article className="price-card" key={row[0].name}><div><h3>{row[0].name}</h3><p>Home service treatment</p></div><div className="price-options">{row.sort((a, b) => a.durationMinutes - b.durationMinutes).map((product) => <span key={product.id}><small>{product.durationMinutes} min</small><strong>{money(product.priceIdr)}</strong></span>)}</div><a className="price-book" href={`https://wa.me/6282326348577?text=${encodeURIComponent(`Hi Massage Bali, I want to book ${row[0].name}.`)}`} target="_blank" rel="noreferrer" aria-label={`Book ${row[0].name} on WhatsApp`}><FaWhatsapp aria-hidden="true" /> Book</a></article>)}</div></section>;
}

