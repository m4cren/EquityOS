import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  tradeAccount: ["m4cren", "funded_m4cren"],
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
