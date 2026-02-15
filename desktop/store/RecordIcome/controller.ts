import { api } from "@/app/service/api-client";
import { IncomeTypes } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFinanceAccount } from "../financeAccountSlice/controller";

export const fetchIncome = createAsyncThunk<IncomeTypes[]>(
  "recordIncome/fetchIncome",
  async () => {
    const data = await api<IncomeTypes[]>({
      endpoint: "/finance/fetch-income",
      method: "GET",
    });

    return data || [];
  }
);

export const recordIncome = createAsyncThunk(
  "recordIncome/recordIncome",
  async (income: IncomeTypes, thunAPI) => {
    const { dispatch } = thunAPI;

    const update = async () => {
      await dispatch(fetchIncome()).unwrap();
      await dispatch(fetchFinanceAccount()).unwrap();
    };

    if (!income) return;

    await api<void, typeof income>({
      endpoint: "/finance/record-income",
      method: "POST",
      body: income,
    });
    return update();
  }
);
