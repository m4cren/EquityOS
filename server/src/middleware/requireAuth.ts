import type { Request, Response, NextFunction } from "express";
import { supabaseFromReq } from "../lib/supabaseFromReq.js";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    supabaseFromReq(req);
    next();
  } catch (e) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
