"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchTradeLevel, increaseTradeLevel } from "./controller";
import { useEffect } from "react";

export const useTradeLevel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { xp_lvl, isPending, errMsg } = useSelector(
    (state: RootState) => state.tradingLevel
  );
  useEffect(() => {
    dispatch(fetchTradeLevel());
  }, [dispatch]);

  return {
    isPending,
    errMsg,
    xp_lvl,
    dispatch,
    increaseTradeLevel,
  };
};
