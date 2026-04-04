import { TradeHistoryStateTypes } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TradeHistoryStateTypes = {
  tradeHistory: [
    {
      id: "2",
      pair: "GBPUSD",
      type: "Short",
      openTime: "2026-01-05T10:00:00.000Z",
      closeTime: "2026-01-05T12:10:00.000Z",
      risk: 1,
      notes: "Followed plan",
      postNotes: "wdwsdasdas",
      tierSetup: "A",
      preSetupImg: [],
      postSetupImg: null,
      pnl: -0.8,
      pnl_in_usd: -20,
      accounts: ["m4cren"],
      setupCriteria: [],
    },
    {
      id: "3",
      pair: "NAS100",
      type: "Long",
      openTime: "2026-01-06T09:45:00.000Z",
      closeTime: "2026-01-06T10:50:00.000Z",
      risk: 1,
      notes: "",
      postNotes: "",
      tierSetup: "B",
      preSetupImg: [],
      postSetupImg: null,
      pnl: 2.1,
      pnl_in_usd: 52.5,
      accounts: ["m4cren"],
      setupCriteria: [],
    },
    {
      id: "4",
      pair: "XAUUSD",
      type: "Short",
      openTime: "2026-01-07T08:30:00.000Z",
      closeTime: "2026-01-07T09:20:00.000Z",
      risk: 1,
      notes: "Fast scalp",
      postNotes: "",
      tierSetup: "A",
      preSetupImg: [],
      postSetupImg: null,
      pnl: 0.6,
      pnl_in_usd: 15,
      accounts: ["funded_m4cren"],
      setupCriteria: [],
    },
    {
      id: "5",
      pair: "EURUSD",
      type: "Short",
      openTime: "2026-01-08T10:20:00.000Z",
      closeTime: "2026-01-08T12:00:00.000Z",
      risk: 1,
      notes: "",
      postNotes: "",
      tierSetup: "A",
      preSetupImg: [],
      postSetupImg: null,
      pnl: -1.2,
      pnl_in_usd: -30,
      accounts: ["m4cren"],
      setupCriteria: [],
    },
  ],
  errMsg: null,
  isPending: false,
};

const tradeHistorySlice = createSlice({
  name: "tradeHistorySlice",
  initialState,
  reducers: {
    setTradeHistory: (
      state,
      action: PayloadAction<TradeHistoryStateTypes["tradeHistory"]>
    ) => {
      state.tradeHistory = action.payload;
    },

    addTrade: (
      state,
      action: PayloadAction<TradeHistoryStateTypes["tradeHistory"][number]>
    ) => {
      state.tradeHistory.unshift(action.payload);
    },

    updateTrade: (
      state,
      action: PayloadAction<TradeHistoryStateTypes["tradeHistory"][number]>
    ) => {
      const index = state.tradeHistory.findIndex(
        (trade) => trade.id === action.payload.id
      );

      if (index !== -1) {
        state.tradeHistory[index] = action.payload;
      }
    },

    removeTrade: (state, action: PayloadAction<string>) => {
      state.tradeHistory = state.tradeHistory.filter(
        (trade) => trade.id !== action.payload
      );
    },

    setTradeHistoryPending: (state, action: PayloadAction<boolean>) => {
      state.isPending = action.payload;
    },

    setTradeHistoryError: (state, action: PayloadAction<string | null>) => {
      state.errMsg = action.payload;
    },

    resetTradeHistory: (state) => {
      state.tradeHistory = [];
      state.errMsg = null;
      state.isPending = false;
    },
  },
});

export const {
  setTradeHistory,
  addTrade,
  updateTrade,
  removeTrade,
  setTradeHistoryPending,
  setTradeHistoryError,
  resetTradeHistory,
} = tradeHistorySlice.actions;

export default tradeHistorySlice.reducer;
