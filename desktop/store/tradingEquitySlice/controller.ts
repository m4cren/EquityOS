import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/app/service/api-client";
import { TradingEquityArgs, TradingEquityTypes } from "@/lib/types";

export const fetchTradingEquity = createAsyncThunk<
  TradingEquityTypes[],
  { trading_acc_id: string }
>("tradingEquity/fetchTradingEquity", async ({ trading_acc_id }) => {
  const data = await api<TradingEquityTypes[]>({
    endpoint: `/trading/fetch-trading-equity?trading_acc_id=${trading_acc_id}`,
    method: "GET",
  });

  return data || [];
});

export const updateTradingEquity = createAsyncThunk<void, TradingEquityArgs>(
  "tradingEquity/updateTradingEquity",
  async (body) => {
    await api<void, TradingEquityArgs>({
      endpoint: "/trading/update-trading-equity",
      method: "POST",
      body,
    });
  }
);

export const updateTradingAccountEquityMonth = createAsyncThunk<
  void,
  {
    trading_acc_id: string;
    equity: number;
    equity_month: string;
  }
>("tradingEquity/updateTradingAccountEquityMonth", async (body) => {
  await api<void, typeof body>({
    endpoint: "/trading/update-trading-account-equity-month",
    method: "PATCH",
    body,
  });
});
