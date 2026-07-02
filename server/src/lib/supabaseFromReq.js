import { createSupabaseClient } from "./supabase.js";
export function supabaseFromReq(req) {
    const raw = req.headers.authorization;
    if (!raw || typeof raw !== "string" || !raw.startsWith("Bearer ")) {
        throw new Error("Missing Authorization header");
    }
    const token = raw.slice(7);
    return createSupabaseClient(token);
}
//# sourceMappingURL=supabaseFromReq.js.map