"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, Loader2, Lock, User } from "lucide-react";
import { brand } from "@/constants/site";

export default function AdminLoginPage() {
  const router = useRouter();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ponytail: hardcoded client-side credentials, NOT real security. Replace with Supabase Auth before launch (see PROJECT_CONTEXT.md)
    if (adminId.trim() === "admin" && password === "admin") {
      window.localStorage.setItem("se_session", JSON.stringify({ user: "admin", role: "admin", expiresAt: Date.now() + 86400000 }));
      router.replace("/admin/dashboard");
      return;
    }

    setError("Invalid admin ID or password.");
    setLoading(false);
  }

  return (
    <div className="admin-login">
      <div className="card">
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Image src={brand.logoWide} alt={brand.name} width={192} height={60} priority style={{ height: 60, width: "auto", margin: "0 auto" }} />
          <h1 style={{ fontSize: "1.4rem", marginTop: 18 }}>Admin sign in</h1>
          <p style={{ color: "var(--muted)", marginTop: 4 }}>Manage projects, gallery and enquiries.</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "grid", gap: 16 }}>
          <label className="field">
            Admin ID
            <span style={{ position: "relative" }}>
              <User size={16} color="var(--muted)" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input className="input" style={{ paddingLeft: 40 }} value={adminId} onChange={(e) => setAdminId(e.target.value)} autoComplete="username" required autoFocus />
            </span>
          </label>
          <label className="field">
            Password
            <span style={{ position: "relative" }}>
              <Lock size={16} color="var(--muted)" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input className="input" style={{ paddingLeft: 40 }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
            </span>
          </label>

          {error && (
            <p role="alert" style={{ display: "flex", gap: 8, alignItems: "center", color: "var(--error)", fontWeight: 600, fontSize: "0.9rem" }}>
              <AlertCircle size={16} /> {error}
            </p>
          )}

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%" }}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign in"}
          </button>
        </form>

        <Link href="/" className="link-arrow" style={{ marginTop: 24, justifyContent: "center", width: "100%", fontSize: "0.9rem" }}>
          <ArrowLeft size={16} /> Back to website
        </Link>
      </div>
    </div>
  );
}
