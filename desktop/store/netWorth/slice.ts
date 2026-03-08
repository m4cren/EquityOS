import { NetWorthStateTypes, NetWorthTypes } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNetWorth } from "./controller";

const initialState: NetWorthStateTypes = {
  netWorth: [],
  isPending: false,
  errMsg: null,
};

const netWorthSlice = createSlice({
  name: "netWorth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchNetWorth.fulfilled,
        (state, action: PayloadAction<NetWorthTypes[]>) => {
          state.netWorth = action.payload;
          state.isPending = false;
        }
      )
      .addCase(fetchNetWorth.pending, (state) => {
        state.isPending = true;
      });
  },
});

export const {} = netWorthSlice.actions;

export default netWorthSlice.reducer;
