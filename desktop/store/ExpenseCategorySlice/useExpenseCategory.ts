import { useEffect } from "react";
import {
  addExpenseCategory,
  deleteExpenseCategory,
  editExpenseCategory,
  fetchExpenseCategory,
} from "./controller";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useExpenseCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { err_msg, is_pending, expense_category } = useSelector(
    (state: RootState) => state.expenseCategory
  );
  useEffect(() => {
    dispatch(fetchExpenseCategory());
  }, [dispatch]);
  return {
    is_pending,
    err_msg,
    dispatch,

    expense_category,
    deleteExpenseCategory,
    addExpenseCategory,
    editExpenseCategory,
  };
};
