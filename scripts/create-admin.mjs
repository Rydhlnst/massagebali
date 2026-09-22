import fs from "node:fs";
if (!process.env.DATABASE_URL) { for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) { const match = line.match(/^([^=]+)=(.*)$/); if (match) process.env[match[1]] = match[2].replace(/^"|"$/g, ""); } }
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const url = process.env.DATABASE_URL; if (!url) throw new Error("DATABASE_URL is required");
const db = drizzle(neon(url));
const auth = betterAuth({ database: drizzleAdapter(db, { provider: "pg" }), secret: process.env.BETTER_AUTH_SECRET, emailAndPassword: { enabled: true, disableSignUp: false } });
const rl = createInterface({ input, output });
const name = await rl.question("Admin name: ");
const email = await rl.question("Admin email: ");
const password = await rl.question("Admin password (min 8 chars): ");
rl.close();
const result = await auth.api.signUpEmail({ body: { name, email, password } });
console.log(`Admin account created: ${result.user.email}`);

