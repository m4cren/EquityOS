import { api } from "@/app/service/api-client";
import { NetWorthArgs, NetWorthTypes } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFinanceAccount } from "../financeAccountSlice/controller";

const dateToday = new Date();
const formattedDate = dateToday.toLocaleDateString("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});
export const initializeNetWorth = createAsyncThunk(
  "netWorth/initializeNetWorth",
  async () => {
    await api({
      endpoint: "/finance/initialize-networth",
      method: "POST",
      body: { formattedDate },
    });
  }
);

export const fetchNetWorth = createAsyncThunk<NetWorthTypes[]>(
  "netWorth/fetchNetWorth",
  async () => {
    const data = await api<NetWorthTypes[]>({
      endpoint: "/finance/fetch-networth",
      method: "GET",
    });
    return data || [];
  }
);

export const updateNetWorth = createAsyncThunk(
  "netWorth/updateNetWorth",
  async (networth: NetWorthArgs, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const update = async () => {
      await dispatch(fetchNetWorth()).unwrap();
      await dispatch(fetchFinanceAccount()).unwrap();
    };

    if (!dispatch) return;

    await api<void, typeof networth>({
      endpoint: "/finance/update-networth",
      method: "POST",
      body: networth,
    });
    return update();
  }
);
