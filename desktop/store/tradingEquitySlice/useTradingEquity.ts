import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  fetchTradingEquity,
  updateTradingEquity,
  updateTradingAccountEquityMonth,
} from "./controller";

export const useTradingEquity = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tradingEquity, isPending, errMsg } = useSelector(
    (state: RootState) => state.tradingEquity
  );

  return {
    isPending,
    errMsg,
    tradingEquity,
    dispatch,
    fetchTradingEquity,
    updateTradingEquity,
    updateTradingAccountEquityMonth,
  };
};
