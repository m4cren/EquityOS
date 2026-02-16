import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchTransfer, recordTransfer } from "./controller";

export const useTransfer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transfer, isPending } = useSelector(
    (state: RootState) => state.transfer
  );

  useEffect(() => {
    dispatch(fetchTransfer());
  }, [dispatch]);

  return { transfer, isPending, recordTransfer, dispatch };
};
