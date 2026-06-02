"use client";

import { useEffect, useRef } from "react";
import { useTradeAccount } from "../tradeAccount/useTradeAccount";
import { useTradingEquity } from "./useTradingEquity";

export const useRecordTradingEquity = () => {
  const { tradeAccount } = useTradeAccount();
  const { dispatch, updateTradingEquity } = useTradingEquity();

  const hasRecorded = useRef(false);

  useEffect(() => {
    if (hasRecorded.current) return;
    if (!tradeAccount.length) return;

    const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

    const recordAllAccounts = async () => {
      await Promise.all(
        tradeAccount.map(async (acc) => {
          if (!acc.acc_id) return;

          await dispatch(
            updateTradingEquity({
              trading_acc_id: acc.acc_id,
              equity: acc.equity,
              date_str: today,
            })
          ).unwrap();
        })
      );

      hasRecorded.current = true;
    };

    recordAllAccounts();
  }, [dispatch, tradeAccount, updateTradingEquity]);
};
