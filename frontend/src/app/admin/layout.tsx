"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ExternalLink,
  FolderKanban,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  MessageSquareQuote,
  Wrench,
  X
} from "lucide-react";
import { brand } from "@/constants/site";
import { isSupabaseActive } from "@/lib/dataClient";
import { getSupabaseBrowserClient } from "@/lib/supabase";

const menu = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Leads", href: "/admin/leads", icon: Inbox },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Check the session once (and again after leaving the login page), not on every navigation
  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    async function checkAuth() {
      try {
        const session = JSON.parse(window.localStorage.getItem("se_session") || "null");
        if (session && session.expiresAt > Date.now()) {
          setUser(session.user);
          return;
        }
        window.localStorage.removeItem("se_session");

        if (isSupabaseActive()) {
          const { data } = await getSupabaseBrowserClient().auth.getUser();
          if (data.user) {
            setUser(data.user.email || "admin");
            return;
          }
        }
        router.replace("/admin/login");
      } catch (err) {
        console.error("Auth check failed", err);
        router.replace("/admin/login");
      } finally {
        setChecking(false);
      }
    }

    checkAuth();
  }, [isLoginPage, router]);

  useEffect(() => setDrawerOpen(false), [pathname]);

  async function handleLogout() {
    window.localStorage.removeItem("se_session");
    if (isSupabaseActive()) await getSupabaseBrowserClient().auth.signOut().catch(() => {});
    setUser("");
    router.replace("/admin/login");
  }

  if (isLoginPage) return <>{children}</>;

  if (checking || !user) {
    return (
      <div className="admin-login" aria-busy="true">
        <Loader2 size={36} className="animate-spin" color="var(--accent)" />
      </div>
    );
  }

  const brandBlock = (
    <div className="admin-brand">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={brand.logoBulb} alt="" />
      <div>
        {brand.name}
        <small>Admin</small>
      </div>
    </div>
  );

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        {brandBlock}
        <button onClick={() => setDrawerOpen(true)} aria-label="Open menu" aria-expanded={drawerOpen}>
          <Menu size={24} />
        </button>
      </header>

      {drawerOpen && <div className="admin-scrim" onClick={() => setDrawerOpen(false)} />}

      <aside className="admin-sidebar" data-open={drawerOpen}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          {brandBlock}
          {drawerOpen && (
            <button className="admin-side-btn" style={{ width: "auto" }} onClick={() => setDrawerOpen(false)} aria-label="Close menu">
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="admin-nav" aria-label="Admin">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} aria-current={pathname?.startsWith(item.href) ? "page" : undefined}>
                <Icon size={18} /> {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="admin-side-footer">
          <div className="admin-user">Signed in as {user}</div>
          <a className="admin-side-btn" href="/" target="_blank" rel="noopener noreferrer">
            <ExternalLink size={18} /> View website
          </a>
          <button className="admin-side-btn" onClick={handleLogout}>
            <LogOut size={18} /> Log out
          </button>
        </div>
      </aside>

      {/* Root layout already wraps everything in <main> */}
      <div className="admin-main">{children}</div>
    </div>
  );
}
