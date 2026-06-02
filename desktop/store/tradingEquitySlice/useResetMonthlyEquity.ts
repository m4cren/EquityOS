"use client";

import { useEffect, useRef } from "react";
import { useTradeAccount } from "../tradeAccount/useTradeAccount";
import { useTradingEquity } from "./useTradingEquity";

export const useResetMonthlyEquity = () => {
  const { tradeAccount } = useTradeAccount();
  const { dispatch, updateTradingAccountEquityMonth } = useTradingEquity();

  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    if (!tradeAccount.length) return;

    const currentMonth = new Date().toISOString().slice(0, 7);

    const resetMonthlyEquity = async () => {
      await Promise.all(
        tradeAccount.map(async (acc) => {
          if (!acc.acc_id) return;
          if (acc.equity_month === currentMonth) return;

          await dispatch(
            updateTradingAccountEquityMonth({
              trading_acc_id: acc.acc_id,
              equity: acc.equity,
              equity_month: currentMonth,
            })
          ).unwrap();
        })
      );

      hasChecked.current = true;
    };

    resetMonthlyEquity();
  }, [dispatch, tradeAccount, updateTradingAccountEquityMonth]);
};
