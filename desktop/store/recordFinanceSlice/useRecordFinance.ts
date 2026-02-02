import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { openIncome, close, openExpense, openTransfer } from "./slice";
export const useRecordFinance = () => {
  const dispatch = useDispatch<AppDispatch>();
  const modalOpen = useSelector((state: RootState) => state.recordFinance);

  const handleOpenIncome = () => dispatch(openIncome());
  const handleOpenExpense = () => dispatch(openExpense());
  const handleOpenTransfer = () => dispatch(openTransfer());
  const handleClose = () => dispatch(close());

  return {
    modalOpen,
    handleClose,
    handleOpenExpense,
    handleOpenIncome,
    handleOpenTransfer,
  };
};
