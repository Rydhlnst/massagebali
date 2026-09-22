export type Product = { id: string; name: string; slug: string; category: string; description: string; durationMinutes: number; priceIdr: number; isActive: boolean; sortOrder: number };
export type SiteSettings = { spaName: string; address: string; whatsapp: string; serviceMode: string; heroTitle: string; heroSubtitle: string };

export const fallbackSettings: SiteSettings = { spaName: "Massage Bali", address: "Canggu, Bali", whatsapp: "082326348577", serviceMode: "Home service massage only", heroTitle: "Relax your body. Refresh your mind.", heroSubtitle: "Professional massage treatments delivered to your home in Canggu." };
const item = (id: string, name: string, durationMinutes: number, priceIdr: number, category = "massage"): Product => ({ id, name, slug: name.toLowerCase().replaceAll(" ", "-"), category, description: `${name} home service massage in Canggu, Bali.`, durationMinutes, priceIdr, isActive: true, sortOrder: 0 });
export const fallbackProducts: Product[] = [
  item("balinese-60", "Balinese Massage", 60, 300000), item("balinese-90", "Balinese Massage", 90, 450000),
  item("traditional-60", "Traditional Massage", 60, 300000), item("traditional-90", "Traditional Massage", 90, 450000),
  item("swedish-60", "Swedish Massage", 60, 300000), item("swedish-90", "Swedish Massage", 90, 450000),
  item("lomi-60", "Lomi-Lomi Massage", 60, 300000), item("lomi-90", "Lomi-Lomi Massage", 90, 450000),
  item("foot-60", "Foot Massage", 60, 250000), item("foot-90", "Foot Massage", 90, 350000),
  item("scrub-60", "Scrub + Massage", 60, 350000), item("scrub-90", "Scrub + Massage", 90, 500000),
  item("face-acupressure-60", "Face Acupressure + Massage", 60, 350000), item("face-acupressure-90", "Face Acupressure + Massage", 90, 500000),
  item("deep-tissue-60", "Deep Tissue", 60, 350000), item("deep-tissue-90", "Deep Tissue", 90, 500000),
  item("shiatsu-60", "Shiatsu", 60, 350000), item("shiatsu-90", "Shiatsu", 90, 500000),
  item("hot-stone-60", "Hot Stone", 60, 350000), item("hot-stone-90", "Hot Stone", 90, 500000),
  item("thai-60", "Thai Massage", 60, 350000), item("thai-90", "Thai Massage", 90, 500000),
  item("lymphatic-60", "Lymphatic", 60, 500000), item("lymphatic-90", "Lymphatic", 90, 750000),
  item("pregnant-60", "Pregnant Massage", 60, 300000), item("pregnant-90", "Pregnant Massage", 90, 500000),
  item("scraping-60", "Massage + Scraping", 60, 325000), item("scraping-90", "Massage + Scraping", 90, 475000),
  item("facial", "Facial", 60, 250000, "facial"), item("face-massage", "Face Massage", 60, 200000, "facial"),
  item("package-1", "Paket 1: Balinese Massage + Scrub + Facial", 120, 500000, "package"), item("package-2", "Paket 2: Balinese Massage + Scrub + Pedi Men", 120, 450000, "package"),
];

export async function getProducts(): Promise<Product[]> {
  const { getDb } = await import("@/lib/db");
  const { products } = await import("@/lib/db/schema");
  const db = getDb();
  if (!db) return fallbackProducts;
  const rows = await db.select().from(products).orderBy(products.sortOrder, products.name, products.durationMinutes);
  return rows.length ? rows : fallbackProducts;
}
export async function getSettings(): Promise<SiteSettings> {
  const { getDb } = await import("@/lib/db");
  const { siteSettings } = await import("@/lib/db/schema");
  const db = getDb();
  if (!db) return fallbackSettings;
  const rows = await db.select().from(siteSettings);
  const values = Object.fromEntries(rows.map((row) => [row.key, row.value]));
  return { ...fallbackSettings, ...values } as SiteSettings;
}
