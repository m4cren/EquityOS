import type { Request, Response } from "express";
import { supabaseFromReq } from "../lib/supabaseFromReq.js";

export const createTask = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;

  const { data, error } = await supabase
    .from("tasks")
    .insert(body)
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json(data);
};

export const fetchTasks = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);

  const { data, error } = await supabase.from("tasks").select("*");

  if (error) {
    return res.json(error).status(404);
  } else {
    return res.json(data);
  }
};

export const finishTask = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;

  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", body.id)
    .eq("title", body.title)
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json(data);
};
