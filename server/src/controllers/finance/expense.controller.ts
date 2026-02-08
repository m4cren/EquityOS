import type { Request, Response } from "express";
import { supabaseFromReq } from "../../lib/supabaseFromReq.js";

export const recordExpense = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;
  const { data, error } = await supabase
    .from("finance_account")
    .select()
    .eq("id", body.acc_id)
    .eq("name", body.account)
    .single();
  const accountBalance = data.balance;
  const newAccountBalance = accountBalance - body.amount;

  await supabase
    .from("finance_account")
    .update({ balance: newAccountBalance })
    .eq("id", body.acc_id)
    .eq("name", body.account)
    .select()
    .single();

  const { error: expenseError } = await supabase
    .from("expenses")
    .insert({
      account: body.account,
      acc_icon: body.acc_icon,
      label: body.label,
      amount: body.amount,
      category: body.category,
      category_icon: body.category_icon,
      date_str: body.date_str,
    })
    .select()
    .single();

  if (expenseError) {
    console.log(error);
  }

  return res.json(body);
};

export const fetchExpense = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);

  const { data, error } = await supabase.from("expenses").select("*");

  if (!error) {
    return res.json(data);
  }
};
