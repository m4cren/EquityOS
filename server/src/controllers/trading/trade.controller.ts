import type { Response, Request } from "express";
import { supabaseFromReq } from "../../lib/supabaseFromReq.js";

export const fetchTrades = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);

  const { data, error } = await supabase.from("trade_data").select("*");

  if (!error) {
    return res.json(data);
  }
};

export const addNewTrade = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;

  const { data, error } = await supabase
    .from("trade_data")
    .insert(body)
    .select()
    .single();

  if (error) {
    console.log(error);
  }

  return res.json(body);
};

export const closeTrade = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;
  console.log("this is closing", body);
  const { data, error } = await supabase
    .from("trade_data")
    .update({
      closeTime: body.closeTime,
      postNotes: body.postNotes,
      postSetupImg: body.postSetupImg,
      pnl: body.pnl,
      pnl_in_usd: body.pnl_in_usd,
    })
    .eq("trade_id", body.trade_id)
    .select()
    .single();
  console.log(error);
  if (error) return res.status(400).json({ error });
  return res.json(data);
};

export const deleteAccount = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;

  const { data, error } = await supabase
    .from("trading_account")
    .delete()
    .eq("id", body.id)
    .eq("label", body.label)
    .select()
    .single();

  return res.status(201).json(data);
};
