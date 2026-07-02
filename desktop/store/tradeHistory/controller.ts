import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/app/service/api-client";
import { TradeFormData } from "@/lib/types";

export const fetchTradeData = createAsyncThunk<TradeFormData[]>(
  "tradeHistory/fetchTradeData",
  async () => {
    const data = await api<TradeFormData[]>({
      endpoint: "/trading/fetch-trades",
      method: "GET",
    });

    return data || [];
  }
);

export const addTradeData = createAsyncThunk(
  "tradeHistory/addTradeData",
  async (trade: TradeFormData, thunAPI) => {
    const { dispatch } = thunAPI;

    if (!trade) return;

    await api<void, typeof trade>({
      endpoint: "/trading/add-trade",
      method: "POST",
      body: trade,
    });
    return await dispatch(fetchTradeData()).unwrap();
  }
);

export const closeTrade = createAsyncThunk(
  "tradingHistory/closeTrade",
  async (trade: TradeFormData, thunAPI) => {
    const { dispatch } = thunAPI;

    if (!trade) return;

    const res = await api<void, typeof trade>({
      endpoint: "/trading/close-trade",
      method: "PATCH",
      body: trade,
    });
    console.log(res);
    return await dispatch(fetchTradeData()).unwrap();
  }
);

export const deleteTradingAccount = createAsyncThunk(
  "tradingAccount/deleteTradingAccount",
  async (account: { id: string; name: string }, thunAPI) => {
    const { dispatch } = thunAPI;

    if (!account) return;

    await api<void, typeof account>({
      endpoint: "/finance/delete-account",
      method: "DELETE",
      body: account,
    });
    return await dispatch(fetchTradeData()).unwrap();
  }
);

export const editTradingAccount = createAsyncThunk(
  "tradingAccount/editTradingAccount",
  async (
    account: { id: string; newName: string; newIcon: string },
    thunAPI
  ) => {
    const { dispatch } = thunAPI;

    if (!account) return;

    await api<void, typeof account>({
      endpoint: "/finance/edit-account",
      method: "PATCH",
      body: account,
    });
    return await dispatch(fetchTradeData()).unwrap();
  }
);
