import { useEffect } from "react";
import {
  addFinanceAccount,
  fetchFinanceAccount,
  deleteFinanceAccount,
  editFinanceAccount,
} from "./controller";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useFinanceAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { err_msg, is_pending, accounts } = useSelector(
    (state: RootState) => state.financeAccount
  );
  useEffect(() => {
    dispatch(fetchFinanceAccount());
  }, [dispatch]);
  return {
    is_pending,
    err_msg,
    dispatch,
    addFinanceAccount,
    accounts,
    deleteFinanceAccount,
    editFinanceAccount,
  };
};
