import { TradingAccountTypes } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTradingAccount } from "./controller";

type TradeAcountStateTypes = {
  tradeAccount: TradingAccountTypes[];
  selectedTradeAcc: string;
  isPending: boolean;
  errMsg: string | null;
};

const initialState: TradeAcountStateTypes = {
  tradeAccount: [],
  selectedTradeAcc: "",
  isPending: true,
  errMsg: null,
};

const tradeAccountSlice = createSlice({
  name: "tradeAccount",
  initialState,
  reducers: {
    setSelectedTradeAcc: (state, action: PayloadAction<string>) => {
      state.selectedTradeAcc = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchTradingAccount.fulfilled,
        (state, action: PayloadAction<TradingAccountTypes[]>) => {
          const accounts = action.payload ?? [];

          state.isPending = false;
          state.errMsg = null;
          state.tradeAccount = accounts;

          state.selectedTradeAcc = accounts[0]?.acc_name ?? "";
        }
      )
      .addCase(fetchTradingAccount.pending, (state) => {
        state.isPending = true;
        state.errMsg = null;
      })
      .addCase(fetchTradingAccount.rejected, (state, action) => {
        state.isPending = false;
        state.tradeAccount = [];
        state.selectedTradeAcc = "";
        state.errMsg =
          action.error.message ?? "Failed to fetch trading accounts";
      });
  },
});

export const { setSelectedTradeAcc } = tradeAccountSlice.actions;

export default tradeAccountSlice.reducer;
