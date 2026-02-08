import { ExpenseStateTypes, ExpenseTypes } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchExpense } from "./controller";

const initialState: ExpenseStateTypes = {
  expense: [],
  isPending: false,
  errMsg: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchExpense.fulfilled,
        (state, action: PayloadAction<ExpenseTypes[]>) => {
          state.expense = action.payload;
          state.errMsg = null;
          state.isPending = false;
        }
      )
      .addCase(fetchExpense.pending, (state) => {
        state.isPending = true;
      });
  },
});

export const {} = expenseSlice.actions;

export default expenseSlice.reducer;
