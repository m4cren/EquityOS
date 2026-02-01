import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/app/service/api-client";
import { AccountTypes } from "@/lib/types";

export const fetchFinanceAccount = createAsyncThunk<AccountTypes[]>(
  "financeAccount/fetchFinanceAccount",
  async () => {
    const data = await api<AccountTypes[]>({
      endpoint: "/finance/fetch-account",
      method: "GET",
    });

    return data || [];
  }
);

export const addFinanceAccount = createAsyncThunk(
  "financeAccount/addFinanceAccount",
  async (account: AccountTypes, thunAPI) => {
    const { dispatch } = thunAPI;

    if (!account) return;

    await api<void, typeof account>({
      endpoint: "/finance/add-account",
      method: "POST",
      body: account,
    });
    return await dispatch(fetchFinanceAccount()).unwrap();
  }
);

export const deleteFinanceAccount = createAsyncThunk(
  "financeAccount/deleteFinanceAccount",
  async (account: { id: string; name: string }, thunAPI) => {
    const { dispatch } = thunAPI;

    if (!account) return;

    await api<void, typeof account>({
      endpoint: "/finance/delete-account",
      method: "DELETE",
      body: account,
    });
    return await dispatch(fetchFinanceAccount()).unwrap();
  }
);

export const editFinanceAccount = createAsyncThunk(
  "financeAccount/editFinanceAccount",
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
    return await dispatch(fetchFinanceAccount()).unwrap();
  }
);
