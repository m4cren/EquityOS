import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/app/service/api-client";
import { ExpenseCategoryIconTypes, ExpenseCategoryTypes } from "@/lib/types";

export const fetchExpenseCategory = createAsyncThunk<ExpenseCategoryTypes[]>(
  "finance/fetchExpenseCategory",
  async () => {
    const data = await api<ExpenseCategoryTypes[]>({
      endpoint: "/finance/fetch-expense-category",
      method: "GET",
    });

    return data || [];
  }
);

export const addExpenseCategory = createAsyncThunk(
  "finance/addExpenseCategory",
  async (expense_category: ExpenseCategoryTypes, thunAPI) => {
    const { dispatch } = thunAPI;

    if (!expense_category) return;

    await api<void, typeof expense_category>({
      endpoint: "/finance/add-expense-category",
      method: "POST",
      body: expense_category,
    });
    return await dispatch(fetchExpenseCategory()).unwrap();
  }
);

export const deleteExpenseCategory = createAsyncThunk(
  "finance/deleteExpenseCategory",
  async (expense_category: { id: string; label: string }, thunAPI) => {
    const { dispatch } = thunAPI;

    if (!expense_category) return;

    await api<void, typeof expense_category>({
      endpoint: "/finance/delete-expense-category",
      method: "DELETE",
      body: expense_category,
    });
    return await dispatch(fetchExpenseCategory()).unwrap();
  }
);

export const editExpenseCategory = createAsyncThunk(
  "finance/editExpenseCategory",
  async (
    expense_category: {
      id: string;
      newLabel: string;
      newIcon: ExpenseCategoryIconTypes;
      newAlloc_per_month: number;
    },
    thunAPI
  ) => {
    const { dispatch } = thunAPI;

    if (!expense_category) return;

    await api<void, typeof expense_category>({
      endpoint: "/finance/edit-expense-category",
      method: "PATCH",
      body: expense_category,
    });
    return await dispatch(fetchExpenseCategory()).unwrap();
  }
);
