import type { Request } from "express";
import { createSupabaseClient } from "./supabase.js";

export function supabaseFromReq(req: Request) {
  const raw = req.headers.authorization;

  if (!raw || typeof raw !== "string" || !raw.startsWith("Bearer ")) {
    throw new Error("Missing Authorization header");
  }

  const token = raw.slice(7);

  return createSupabaseClient(token);
}
