import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useTradeHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tradeHistory, isPending, errMsg } = useSelector(
    (state: RootState) => state.tradeHistory
  );

  return { isPending, errMsg, tradeHistory, dispatch };
};
