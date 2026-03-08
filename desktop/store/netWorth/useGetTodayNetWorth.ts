import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { getNetWorth } from "@/store/netWorth/totalNetTodaySlice";
import { useFinanceAccount } from "../financeAccountSlice/useFinanceAccount";

export const useGetTodayNetWorth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { accounts } = useFinanceAccount();

  useEffect(() => {
    dispatch(getNetWorth(accounts));
  }, [accounts, dispatch]);

  return { accounts };
};
