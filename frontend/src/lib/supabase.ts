import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;
let adminClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error("Supabase browser environment variables are missing.");
    }
    browserClient = createClient(url, key);
  }

  return browserClient;
}

export function getSupabaseAdminClient() {
  if (!adminClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("Supabase admin environment variables are missing.");
    }
    adminClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false }
    });
  }

  return adminClient;
}
