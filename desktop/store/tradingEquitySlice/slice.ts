import { TradingEquityTypes } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchTradingEquity } from "./controller";

const initialState: {
  tradingEquity: TradingEquityTypes[];
  isPending: boolean;
  errMsg: string | null;
} = {
  tradingEquity: [],
  isPending: false,
  errMsg: null,
};

const tradingEquitySlice = createSlice({
  name: "tradingEquity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTradingEquity.pending, (state) => {
        state.isPending = true;
        state.errMsg = null;
      })
      .addCase(fetchTradingEquity.fulfilled, (state, action) => {
        state.isPending = false;
        state.tradingEquity = action.payload;
      })
      .addCase(fetchTradingEquity.rejected, (state, action) => {
        state.isPending = false;
        state.errMsg = action.error.message || "Failed to fetch trading equity";
      });
  },
});

export default tradingEquitySlice.reducer;
