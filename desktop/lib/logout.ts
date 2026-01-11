// app/lib/logout.ts (or similar)
"use client";

import { supabase } from "@/utils/supabase/client";

export async function logout() {
  await supabase.auth.signOut();

  // HARD reload to re-run middleware
  window.location.href = "/auth/login";
}
