"use client";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardLoginPage() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [showPassword, setShowPassword] = useState(false); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setError(""); const result = await authClient.signIn.email({ email, password, callbackURL: "/dashboard" }); if (result.error) setError(result.error.message ?? "Invalid email or password"); else window.location.href = "/dashboard"; setLoading(false); }
  return <main className="auth-shell"><section className="auth-panel"><div className="auth-logo"><Image src="/massage-bali-logo.png" alt="Massage Bali" fill sizes="220px" /></div><p className="eyebrow">Massage Bali / CMS</p><h1>Dashboard login</h1><p>Sign in to manage your pricelist and website content.</p><form onSubmit={submit}><label>Email<Input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Password<div className="password-field"><Input type={showPassword ? "text" : "password"} required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /><button type="button" className="password-toggle" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((current) => !current)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>{error && <p className="auth-error" role="alert">{error}</p>}<Button type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</Button></form></section></main>;
}


