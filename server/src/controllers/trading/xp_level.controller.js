import { supabaseFromReq } from "../../lib/supabaseFromReq.js";
export const fetchTradeLevel = async (req, res) => {
    const supabase = supabaseFromReq(req);
    // get user
    const { data: { user }, error: userError, } = await supabase.auth.getUser();
    if (userError || !user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const uuid = user.id;
    // check if row exists for this user
    const { data, error } = await supabase
        .from("trading_lvl")
        .select("*")
        .eq("uuid", uuid)
        .single();
    // if no row → create one
    if (error && error.code === "PGRST116") {
        const { data: inserted, error: insertError } = await supabase
            .from("trading_lvl")
            .insert({
            uuid,
            xp_lvl: 0,
        })
            .select()
            .single();
        if (insertError) {
            return res.status(500).json({ error: insertError.message });
        }
        return res.json(inserted);
    }
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    return res.json(data.xp_lvl);
};
export const increaseXp = async (req, res) => {
    const supabase = supabaseFromReq(req);
    const { data: { user }, error: userError, } = await supabase.auth.getUser();
    if (userError || !user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const newXp = Number(req.body.xp_lvl);
    if (Number.isNaN(newXp)) {
        return res.status(400).json({ error: "Invalid xp_lvl" });
    }
    const { data, error } = await supabase
        .from("trading_lvl")
        .update({ xp_lvl: newXp })
        .eq("uuid", user.id) // ✅ select/update only own row
        .select()
        .single();
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    return res.json(data);
};
//# sourceMappingURL=xp_level.controller.js.map