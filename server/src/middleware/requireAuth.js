import { supabaseFromReq } from "../lib/supabaseFromReq.js";
export const requireAuth = (req, res, next) => {
    try {
        supabaseFromReq(req);
        next();
    }
    catch (e) {
        return res.status(401).json({ error: "Unauthorized" });
    }
};
//# sourceMappingURL=requireAuth.js.map