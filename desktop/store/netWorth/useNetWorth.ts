import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useRef } from "react";
import {
  initializeNetWorth,
  fetchNetWorth,
  updateNetWorth,
} from "./controller";

export const useNetworthState = () => {
  const dispatch = useDispatch<AppDispatch>();

  const netWorth = useSelector((state: RootState) => state.networth);

  const hasFetch = useRef<boolean>(false);

  useEffect(() => {
    if (hasFetch.current) return;
    dispatch(initializeNetWorth());
    dispatch(fetchNetWorth());
    hasFetch.current = true;
  }, [dispatch]);

  return {
    dispatch,
    netWorth,
    fetchNetWorth,
    updateNetWorth,
  };
};
