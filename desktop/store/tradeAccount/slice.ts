import { TradingAccountTypes } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const demoTradeAccount: TradingAccountTypes[] = [
  {
    acc_id: "2n2988",
    acc_name: "m4cren",
    base_equity: 3000,
    equity: 3157,
    is_funded: false,
  },
  {
    acc_id: "29237v",
    acc_name: "funded_m4cren",
    base_equity: 200000,
    equity: 203157,
    is_funded: true,
  },
];

const initialState = {
  tradeAccount: demoTradeAccount,
  selectedTradeAcc: "m4cren",
  isPending: false,
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
});

export const { setSelectedTradeAcc } = tradeAccountSlice.actions;
export default tradeAccountSlice.reducer;
