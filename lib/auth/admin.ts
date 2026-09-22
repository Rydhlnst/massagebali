import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function requireAdmin(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  return session ? null : NextResponse.json({ error: "Authentication required" }, { status: 401 });
}
