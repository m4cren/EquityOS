import { supabaseFromReq } from "../lib/supabaseFromReq.js";
import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;
export const hashPin = (pin) => bcrypt.hash(pin, SALT_ROUNDS);
export const verifyPin = (pin, hash) => bcrypt.compare(pin, hash);
export const checkIfPinExist = async (req, res) => {
    const supabase = supabaseFromReq(req);
    const { data, error } = await supabase.from("security_pin").select("*");
    if (!error) {
        return res.status(201).json(data);
    }
};
export const createNewPin = async (req, res) => {
    const supabase = supabaseFromReq(req);
    const body = await req.body;
    const hashedPin = await hashPin(body.pin);
    return res.json({ hashed_pin: hashedPin });
};
//# sourceMappingURL=security.controller.js.map