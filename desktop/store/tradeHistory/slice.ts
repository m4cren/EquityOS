import { TradeFormData, TradeHistoryStateTypes } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTradeData } from "./controller";

const initialState: TradeHistoryStateTypes = {
  tradeHistory: [],
  errMsg: null,
  isPending: false,
};

const tradeHistorySlice = createSlice({
  name: "tradeHistorySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchTradeData.fulfilled,
        (state, action: PayloadAction<TradeFormData[]>) => {
          state.isPending = false;
          state.tradeHistory = action.payload;
        }
      )
      .addCase(fetchTradeData.pending, (state) => {
        state.isPending = true;
      });
  },
});

export const {} = tradeHistorySlice.actions;

export default tradeHistorySlice.reducer;
