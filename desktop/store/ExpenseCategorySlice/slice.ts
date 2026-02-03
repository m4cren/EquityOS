import { ExpenseCategoryTypes } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchExpenseCategory } from "./controller";

const initialState: {
  is_pending: boolean;
  err_msg: string | null;
  expense_category: ExpenseCategoryTypes[];
} = {
  is_pending: false,
  err_msg: null,
  expense_category: [],
};

const expenseCategorySlice = createSlice({
  name: "expenseCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchExpenseCategory.fulfilled,
        (state, action: PayloadAction<ExpenseCategoryTypes[]>) => {
          state.is_pending = false;
          state.expense_category = action.payload;
        }
      )
      .addCase(fetchExpenseCategory.pending, (state) => {
        state.is_pending = true;
      });
  },
});

export default expenseCategorySlice.reducer;
