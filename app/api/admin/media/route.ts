import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { r2Configured, uploadToR2 } from "@/lib/storage/r2";

export const runtime = "nodejs";
export async function POST(request: Request) {
  const denied = await requireAdmin(request); if (denied) return denied;
  if (!r2Configured()) return NextResponse.json({ error: "R2 storage is not configured" }, { status: 503 });
  const form = await request.formData(); const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "A file is required" }, { status: 400 });
  if (!file.type.startsWith("image/") || file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Only images up to 8 MB are allowed" }, { status: 400 });
  const key = `massage-bali/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
  const url = await uploadToR2(key, new Uint8Array(await file.arrayBuffer()), file.type);
  return NextResponse.json({ data: { key, url, name: file.name, type: file.type, size: file.size } }, { status: 201 });
}

