import { AccountTypes } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFinanceAccount } from "./controller";

const initialState: {
  is_pending: boolean;
  err_msg: string | null;
  accounts: AccountTypes[];
} = {
  is_pending: true,
  err_msg: null,
  accounts: [],
};

const financeAccountSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchFinanceAccount.fulfilled,
        (state, action: PayloadAction<AccountTypes[]>) => {
          state.is_pending = false;
          state.accounts = action.payload;
        }
      )
      .addCase(fetchFinanceAccount.pending, (state) => {
        state.is_pending = true;
      });
  },
});

export default financeAccountSlice.reducer;
