import type { Request, Response } from "express";
import { supabaseFromReq } from "../../lib/supabaseFromReq.js";

export const initializeNetWorth = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;
  const { data, error } = await supabase.from("net_worth").select("*");

  if (data && data.length <= 0) {
    await supabase
      .from("net_worth")
      .insert({ balance: 0, date_str: body.formattedDate });
  }
};

export const updateNetWorth = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;

  const { data, error } = await supabase
    .from("net_worth")
    .insert({ balance: body.balance, date_str: body.date_str });

  if (error) {
    return res.json(error);
  }

  return res.json(body);
};

export const fetchNetWorth = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;
  const { data, error } = await supabase.from("net_worth").select("*");

  if (error) {
    return res.json(error);
  }

  return res.json(data);
};
