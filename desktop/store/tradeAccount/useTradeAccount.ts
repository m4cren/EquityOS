"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setSelectedTradeAcc } from "./slice";
import { fetchTradingAccount, addTradingAccount } from "./controller";
import { useEffect } from "react";

export const useTradeAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tradeAccount, isPending, errMsg, selectedTradeAcc } = useSelector(
    (state: RootState) => state.tradeAccount
  );
  useEffect(() => {
    dispatch(fetchTradingAccount());
  }, [dispatch]);
  return {
    isPending,
    errMsg,
    tradeAccount,
    dispatch,

    setSelectedTradeAcc,
    selectedTradeAcc,
    fetchTradingAccount,
    addTradingAccount,
  };
};
