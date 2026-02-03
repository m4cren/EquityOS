import { configureStore } from "@reduxjs/toolkit";
import sidePanelReducer from "./sidePanel/sidePanelSlice";
import financeAccountReducer from "./financeAccountSlice/slice";
import taskReducer from "./taskSlice/slice";
import recordFinanceReducer from "./recordFinanceSlice/slice";
import expenseCategoryReducer from "./ExpenseCategorySlice/slice";

export const store = configureStore({
  reducer: {
    sidePanel: sidePanelReducer,
    tasks: taskReducer,
    financeAccount: financeAccountReducer,
    recordFinance: recordFinanceReducer,
    expenseCategory: expenseCategoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🚨 disables all checks
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
