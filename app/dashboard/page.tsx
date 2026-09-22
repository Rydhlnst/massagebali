import { getProducts, getSettings } from "@/lib/data/catalog";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardClient } from "./dashboard-client";

export const dynamic = "force-dynamic";
export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/dashboard/login");
  const [products, settings] = await Promise.all([getProducts(), getSettings()]);
  return <DashboardClient initialProducts={products} initialSettings={settings} databaseConfigured={Boolean(process.env.DATABASE_URL)} userEmail={session.user.email} />;
}

