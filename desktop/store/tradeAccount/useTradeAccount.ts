import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setSelectedTradeAcc } from "./slice";

export const useTradeAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tradeAccount, isPending, errMsg, selectedTradeAcc } = useSelector(
    (state: RootState) => state.tradeAccount
  );

  return {
    isPending,
    errMsg,
    tradeAccount,
    dispatch,
    setSelectedTradeAcc,
    selectedTradeAcc,
  };
};
