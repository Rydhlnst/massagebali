import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { getProducts } from "@/lib/data/catalog";
import { productSchema } from "@/lib/validation/schemas";
import { requireAdmin } from "@/lib/auth/admin";

export async function GET() { return NextResponse.json({ data: await getProducts(), databaseConfigured: Boolean(process.env.DATABASE_URL) }); }
export async function POST(request: Request) {
  const denied = await requireAdmin(request); if (denied) return denied;
  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid product", issues: parsed.error.flatten() }, { status: 400 });
  const db = getDb(); if (!db) return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  const [created] = await db.insert(products).values(parsed.data).returning(); return NextResponse.json({ data: created }, { status: 201 });
}

