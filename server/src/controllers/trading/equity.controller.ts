import type { Request, Response } from "express";
import { supabaseFromReq } from "../../lib/supabaseFromReq.js";

export const fetchTradingEquity = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const { trading_acc_id } = req.query;

  const { data, error } = await supabase
    .from("trading_account_equity")
    .select("*")
    .eq("trading_acc_id", trading_acc_id)
    .order("date_str", { ascending: true });

  if (error) {
    return res.status(400).json({ error });
  }

  return res.json(data);
};
export const updateTradingEquity = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;

  const { data, error } = await supabase
    .from("trading_account_equity")
    .upsert(
      {
        trading_acc_id: body.trading_acc_id,
        equity: body.equity,
        date_str: body.date_str,
      },
      {
        onConflict: "trading_acc_id,date_str",
      }
    )
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error });
  }

  return res.json(data);
};

export const updateTradingAccountEquityMonth = async (
  req: Request,
  res: Response
) => {
  const supabase = supabaseFromReq(req);
  const { trading_acc_id, equity, equity_month } = req.body;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { data, error } = await supabase
    .from("trading_account")
    .update({
      equity_month_start: equity,
      equity_month,
    })
    .eq("acc_id", trading_acc_id)
    .eq("uuid", user.id)
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(data);
};
