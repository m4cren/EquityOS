import { supabaseFromReq } from "../../lib/supabaseFromReq.js";
export const fetchTrades = async (req, res) => {
  const supabase = supabaseFromReq(req);
  const { data, error } = await supabase.from("trade_data").select("*");
  if (!error) {
    return res.json(data);
  }
};
export const addNewTrade = async (req, res) => {
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
export const closeTrade = async (req, res) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;
  const accounts = body.accounts;
  console.log(body);
  const updateAccount = async () => {
    await Promise.all(
      accounts.map(async (acc) => {
        // 1. Get current equity
        const { data: accountData, error: fetchError } = await supabase
          .from("trading_account")
          .select("equity")
          .eq("acc_name", acc.account)
          .single();
        if (fetchError) throw fetchError;
        const newEquity = (accountData.equity || 0) + (acc.pnl_in_usd || 0);
        // 2. Update equity
        const { error: updateError } = await supabase
          .from("trading_account")
          .update({ equity: newEquity })
          .eq("acc_name", acc.account);
        if (updateError) throw updateError;
      })
    );
  };
  try {
    // 🔥 1. Update account equities
    await updateAccount();
    // 🔥 2. Close trade (store accounts JSON instead of pnl_in_usd)
    const { data, error } = await supabase
      .from("trade_data")
      .update({
        closeTime: body.closeTime,
        postNotes: body.postNotes,
        postSetupImg: body.postSetupImg,
        pnl: Number(body.pnl),
        accounts: accounts, // ✅ store full breakdown
      })
      .eq("trade_id", body.trade_id)
      .select()
      .single();
    if (error) return res.status(400).json({ error });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
export const deleteAccount = async (req, res) => {
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
//# sourceMappingURL=trade.controller.js.map
