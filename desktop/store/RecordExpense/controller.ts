import { api } from "@/app/service/api-client";
import { ExpenseTypes } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFinanceAccount } from "../financeAccountSlice/controller";

export const fetchExpense = createAsyncThunk<ExpenseTypes[]>(
  "recordExpense/fetchExpense",
  async () => {
    const data = await api<ExpenseTypes[]>({
      endpoint: "/finance/fetch-expense",
      method: "GET",
    });

    return data || [];
  }
);

export const recordExpense = createAsyncThunk(
  "recordExpense/recordExpense",
  async (expense: ExpenseTypes, thunAPI) => {
    const { dispatch } = thunAPI;

    const update = async () => {
      await dispatch(fetchExpense()).unwrap();
      await dispatch(fetchFinanceAccount()).unwrap();
    };

    if (!expense) return;

    await api<void, typeof expense>({
      endpoint: "/finance/record-expense",
      method: "POST",
      body: expense,
    });
    return update();
  }
);
