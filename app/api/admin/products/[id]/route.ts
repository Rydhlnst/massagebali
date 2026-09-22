import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validation/schemas";
import { requireAdmin } from "@/lib/auth/admin";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(request); if (denied) return denied;
  const { id } = await params; const parsed = productSchema.partial().safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid product", issues: parsed.error.flatten() }, { status: 400 });
  const db = getDb(); if (!db) return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  const [updated] = await db.update(products).set({ ...parsed.data, updatedAt: new Date() }).where(eq(products.id, id)).returning();
  return updated ? NextResponse.json({ data: updated }) : NextResponse.json({ error: "Product not found" }, { status: 404 });
}
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(request); if (denied) return denied;
  const { id } = await params; const db = getDb(); if (!db) return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  await db.delete(products).where(eq(products.id, id)); return new NextResponse(null, { status: 204 });
}

