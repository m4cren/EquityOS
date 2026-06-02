import { configureStore } from "@reduxjs/toolkit";
import sidePanelReducer from "./sidePanel/sidePanelSlice";
import financeAccountReducer from "./financeAccountSlice/slice";
import taskReducer from "./taskSlice/slice";
import recordFinanceReducer from "./recordFinanceSlice/slice";
import expenseCategoryReducer from "./ExpenseCategorySlice/slice";
import expenseReducer from "./RecordExpense/slice";
import incomeReducer from "./RecordIcome/slice";
import transferReducer from "./RecordTransfer/slice";
import networthReducer from "./netWorth/slice";
import todayNetworthReducer from "./netWorth/totalNetTodaySlice";
import tradeHistoryReducer from "./tradeHistory/slice";
import tradeAccountReducer from "./tradeAccount/slice";
import tradingSystemReducer from "./tradingSystem/slice";
import tradingEquityReducer from "./tradingEquitySlice/slice";
import tradingLevelReducer from "./tradeLevel/slice";

export const store = configureStore({
  reducer: {
    sidePanel: sidePanelReducer,
    tasks: taskReducer,
    financeAccount: financeAccountReducer,
    recordFinance: recordFinanceReducer,
    expenseCategory: expenseCategoryReducer,
    expense: expenseReducer,
    income: incomeReducer,
    transfer: transferReducer,
    networth: networthReducer,
    todayNetworth: todayNetworthReducer,
    tradeHistory: tradeHistoryReducer,
    tradeAccount: tradeAccountReducer,
    tradingSystem: tradingSystemReducer,
    tradingEquity: tradingEquityReducer,
    tradingLevel: tradingLevelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🚨 disables all checks
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
