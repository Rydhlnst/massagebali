import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { getSettings } from "@/lib/data/catalog";
import { settingsSchema } from "@/lib/validation/schemas";
import { requireAdmin } from "@/lib/auth/admin";

export async function GET() { return NextResponse.json({ data: await getSettings(), databaseConfigured: Boolean(process.env.DATABASE_URL) }); }
export async function PUT(request: Request) {
  const denied = await requireAdmin(request); if (denied) return denied;
  const parsed = settingsSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid settings", issues: parsed.error.flatten() }, { status: 400 });
  const db = getDb(); if (!db) return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  for (const [key, value] of Object.entries(parsed.data)) {
    const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    if (existing.length) await db.update(siteSettings).set({ value, updatedAt: new Date() }).where(eq(siteSettings.key, key)); else await db.insert(siteSettings).values({ key, value });
  }
  return NextResponse.json({ data: parsed.data });
}

