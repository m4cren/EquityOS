import { createSlice } from "@reduxjs/toolkit";
type FinanceMode = "income" | "expense" | "transfer" | "";

const initialState = "" as FinanceMode;

export const recordFinanceSlice = createSlice({
  name: "recordFinance",
  initialState,
  reducers: {
    openIncome: (): FinanceMode => "income",
    openExpense: (): FinanceMode => "expense",
    openTransfer: (): FinanceMode => "transfer",
    close: (): FinanceMode => "",
  },
});

export const { openIncome, openExpense, openTransfer, close } =
  recordFinanceSlice.actions;

export default recordFinanceSlice.reducer;
