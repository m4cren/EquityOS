import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/app/service/api-client";
import { TradingAccountTypes } from "@/lib/types";

export const fetchTradingAccount = createAsyncThunk<TradingAccountTypes[]>(
  "tradingAccount/fetchTradingAccount",
  async () => {
    const data = await api<TradingAccountTypes[]>({
      endpoint: "/trading/fetch-accounts",
      method: "GET",
    });

    return data || [];
  }
);

export const addTradingAccount = createAsyncThunk(
  "tradingAccount/addTradingAccount",
  async (account: TradingAccountTypes, thunAPI) => {
    const { dispatch } = thunAPI;

    if (!account) return;

    await api<void, typeof account>({
      endpoint: "/trading/add-account",
      method: "POST",
      body: account,
    });
    return await dispatch(fetchTradingAccount()).unwrap();
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
    return await dispatch(fetchTradingAccount()).unwrap();
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
    return await dispatch(fetchTradingAccount()).unwrap();
  }
);
