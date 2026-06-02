import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/app/service/api-client";

export const fetchTradeLevel = createAsyncThunk<number>(
  "tradeLevel/fetchTradeLevel",
  async () => {
    const data = await api<number>({
      endpoint: "/trading/fetch-trade-level",
      method: "GET",
    });
    console.log(data);
    return data || 0;
  }
);

export const increaseTradeLevel = createAsyncThunk(
  "tradeLevel/increaseTradeLevel",
  async (xp_lvl: number, thunkAPI) => {
    const { dispatch } = thunkAPI;

    if (xp_lvl == null) return;

    await api<void, { xp_lvl: number }>({
      endpoint: "/trading/increase-xp",
      method: "POST",
      body: { xp_lvl }, // ✅ FIX
    });

    return await dispatch(fetchTradeLevel()).unwrap();
  }
);
