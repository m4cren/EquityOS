import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useTradingSystem = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tradingSystem, isPending, errMsg } = useSelector(
    (state: RootState) => state.tradingSystem
  );

  return {
    tradingSystem,
    isPending,
    errMsg,
    dispatch,
  };
};
