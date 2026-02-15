import type { Request, Response } from "express";
import { supabaseFromReq } from "../../lib/supabaseFromReq.js";

export const recordIncome = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;
  const { data, error } = await supabase
    .from("finance_account")
    .select()
    .eq("id", body.acc_id)
    .eq("name", body.received_in)
    .single();
  const accountBalance = Number(data.balance);
  const amount = Number(body.amount);
  const newAccountBalance = accountBalance + amount;

  await supabase
    .from("finance_account")
    .update({ balance: newAccountBalance })
    .eq("id", body.acc_id)
    .eq("name", body.received_in)
    .select()
    .single();

  const { error: incomeError } = await supabase
    .from("income")
    .insert({
      received_in: body.received_in,
      acc_icon: body.acc_icon,
      income_stream: body.income_stream,
      amount: body.amount,
      income_type: body.income_type,

      date_str: body.date_str,
    })
    .select()
    .single();

  if (incomeError) {
    console.log(error);
  }

  return res.json(body);
};

export const fetchIncome = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);

  const { data, error } = await supabase.from("income").select("*");

  if (!error) {
    return res.json(data);
  }
};
