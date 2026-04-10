import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchTradeData, addTradeData, closeTrade } from "./controller";
import { useEffect } from "react";

export const useTradeHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tradeHistory, isPending, errMsg } = useSelector(
    (state: RootState) => state.tradeHistory
  );
  useEffect(() => {
    dispatch(fetchTradeData());
  }, [dispatch]);
  return {
    isPending,
    errMsg,
    tradeHistory,
    dispatch,
    fetchTradeData,
    addTradeData,
    closeTrade,
  };
};
