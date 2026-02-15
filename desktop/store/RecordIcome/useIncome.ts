import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchIncome, recordIncome } from "./controller";
import { useEffect } from "react";

export const useIncome = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { income, isPending } = useSelector((state: RootState) => state.income);

  useEffect(() => {
    dispatch(fetchIncome());
  }, [dispatch]);

  return { recordIncome, dispatch, isPending, income };
};
