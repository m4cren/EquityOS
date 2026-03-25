import {
  SetupCriteria,
  TradeFormData,
  TradeHistoryStateTypes,
} from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import { demoClosedTrades } from "./demoClosedTrades";

const initialState: TradeHistoryStateTypes = {
  tradeHistory: demoClosedTrades,
  errMsg: null,
  isPending: false,
};

const tradeHistorySlice = createSlice({
  name: "tradeHistorySlice",
  initialState,
  reducers: {},
});

export const {} = tradeHistorySlice.actions;
export default tradeHistorySlice.reducer;
