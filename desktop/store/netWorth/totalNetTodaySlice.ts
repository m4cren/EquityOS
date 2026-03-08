import { AccountTypes } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: number = 0;

const totalNetTodaySlice = createSlice({
  name: "totalNetWorthToday",
  initialState,
  reducers: {
    getNetWorth: (state, action: PayloadAction<AccountTypes[]>) => {
      const totalNetWorthThisDay: number = action.payload.reduce(
        (sum: number, acc: AccountTypes) => {
          return sum + acc.balance;
        },
        0
      );

      return totalNetWorthThisDay;
    },
  },
});

export default totalNetTodaySlice.reducer;

export const { getNetWorth } = totalNetTodaySlice.actions;
