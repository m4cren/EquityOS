import type { Response, Request } from "express";
import { supabaseFromReq } from "../../lib/supabaseFromReq.js";

export const fetchAccounts = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);

  const { data, error } = await supabase.from("finance_account").select("*");

  if (!error) {
    return res.json(data);
  }
};

export const addNewAccount = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;

  const { data, error } = await supabase
    .from("finance_account")
    .insert(body)
    .select()
    .single();

  if (error) {
    console.log(error);
  }

  return res.json(body);
};

export const deleteAccount = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;

  const { data, error } = await supabase
    .from("finance_account")
    .delete()
    .eq("id", body.id)
    .eq("label", body.label)
    .select()
    .single();

  return res.status(201).json(data);
};

export const editAccount = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;
  console.log(body);
  const { data, error } = await supabase
    .from("finance_account")
    .update({ name: body.newName, icon: body.newIcon })
    .eq("id", body.id)
    .select()
    .single();

  if (error) return res.status(400).json({ error });
  return res.json(data);
};
