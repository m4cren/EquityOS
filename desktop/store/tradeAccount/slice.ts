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
  errMsg: null as string | null,
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
          state.isPending = false;
          state.tradeAccount = action.payload;
          state.selectedTradeAcc = action.payload[0].acc_name;
        }
      )
      .addCase(fetchTradingAccount.pending, (state) => {
        state.isPending = true;
      });
  },
});

export const { setSelectedTradeAcc } = tradeAccountSlice.actions;

export default tradeAccountSlice.reducer;
