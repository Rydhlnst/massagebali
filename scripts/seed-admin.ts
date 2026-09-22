import fs from "node:fs";
(async () => {
  for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) { const match = line.match(/^([^=]+)=(.*)$/); if (match) process.env[match[1]] = match[2].replace(/^"|"$/g, ""); }
  const { betterAuth } = await import("better-auth");
  const { drizzleAdapter } = await import("better-auth/adapters/drizzle");
  const { getDb } = await import("../lib/db");
  const db = getDb(); if (!db) throw new Error("DATABASE_URL is required");
  const bootstrapAuth = betterAuth({ database: drizzleAdapter(db, { provider: "pg" }), secret: process.env.BETTER_AUTH_SECRET, baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000", emailAndPassword: { enabled: true, disableSignUp: false } });
  const result = await bootstrapAuth.api.signUpEmail({ body: { name: "Massage Bali Admin", email: "massagebali@gmail.com", password: "admin123A!" } });
  console.log(`Admin account created: ${result.user.email}`);
})();
