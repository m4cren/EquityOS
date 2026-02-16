import { TransferStateTypes, TransferTypes } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTransfer } from "./controller";

const initialState: TransferStateTypes = {
  transfer: [],
  isPending: false,
  errMsg: null,
};

const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchTransfer.fulfilled,
        (state, action: PayloadAction<TransferTypes[]>) => {
          state.isPending = false;
          state.errMsg = null;
          state.transfer = action.payload;
        }
      )
      .addCase(fetchTransfer.pending, (state) => {
        state.isPending = true;
      });
  },
});

export const {} = transferSlice.actions;
export default transferSlice.reducer;
