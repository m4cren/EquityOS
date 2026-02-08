import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { recordExpense, fetchExpense } from "./controller";
import { useEffect } from "react";

export const useExpense = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { expense, isPending } = useSelector(
    (state: RootState) => state.expense
  );

  useEffect(() => {
    dispatch(fetchExpense());
  }, [dispatch]);

  return { recordExpense, dispatch, isPending, expense };
};
