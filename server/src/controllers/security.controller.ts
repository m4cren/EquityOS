import type { Response, Request } from "express";
import { supabaseFromReq } from "../lib/supabaseFromReq.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPin = (pin: string) => bcrypt.hash(pin, SALT_ROUNDS);
export const verifyPin = (pin: string, hash: string) =>
  bcrypt.compare(pin, hash);

export const checkIfPinExist = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);

  const { data, error } = await supabase.from("security_pin").select("*");

  if (!error) {
    return res.status(201).json(data);
  }
};

export const createNewPin = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = await req.body;

  const hashedPin = await hashPin(body.pin);

  return res.json({ hashed_pin: hashedPin });
};
