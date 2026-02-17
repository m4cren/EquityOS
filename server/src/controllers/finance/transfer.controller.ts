import type { Request, Response } from "express";
import { supabaseFromReq } from "../../lib/supabaseFromReq.js";

export const recordTransfer = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;

  const { data: fromData, error: fromError } = await supabase
    .from("finance_account")
    .select()
    .eq("id", body.from_acc_id)
    .eq("name", body.from_acc)
    .single();

  const { data: toData, error: toError } = await supabase
    .from("finance_account")
    .select()
    .eq("id", body.to_acc_id)
    .eq("name", body.to_acc)
    .single();

  const fromAccBalance = Number(fromData.balance);
  const toAccBalance = Number(toData.balance);
  const amountToTransfer = Number(body.amount);

  const fromAccNewBalance = fromAccBalance - amountToTransfer;
  const toAccNewBalance = toAccBalance + amountToTransfer;

  await supabase
    .from("finance_account")
    .update({ balance: fromAccNewBalance })
    .eq("id", body.from_acc_id)
    .eq("name", body.from_acc)
    .select()
    .single();
  await supabase
    .from("finance_account")
    .update({ balance: toAccNewBalance })
    .eq("id", body.to_acc_id)
    .eq("name", body.to_acc)
    .select()
    .single();

  const { data: transferData, error: transferError } = await supabase
    .from("transfer")
    .insert({
      amount: body.amount,
      date_str: body.date_str,
      from_acc_icon: body.from_acc_icon,
      to_acc_icon: body.to_acc_icon,
      from_acc: body.from_acc,
      to_acc: body.to_acc,
    })
    .select()
    .single();

  if (transferError) {
    console.log(transferError);
    return;
  }

  return res.json(transferData);
};

export const fetchTransfer = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
};
