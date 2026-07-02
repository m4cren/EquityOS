import { createClient } from "@supabase/supabase-js";
export const createSupabaseClient = (accessToken) => {
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
        global: {
            headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        },
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
        },
    });
};
//# sourceMappingURL=supabase.js.map