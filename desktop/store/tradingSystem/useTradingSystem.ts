"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  createTradingSystem,
  addTradingCriterion,
  addTradingPair,
  addTradingStep,
  fetchTradingSystem,
  removeTradingCriterion,
  removeTradingPair,
  removeTradingStep,
  updateTradingCriteria,
  updateTradingPairs,
  updateTradingSteps,
  updateTradingSystem,
} from "./controller";
import { useEffect } from "react";
export const useTradingSystem = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tradingSystem, isPending, errMsg } = useSelector(
    (state: RootState) => state.tradingSystem
  );
  useEffect(() => {
    dispatch(fetchTradingSystem());
  }, [dispatch]);
  return {
    tradingSystem,
    isPending,
    errMsg,
    dispatch,
    createTradingSystem,
    addTradingCriterion,
    addTradingPair,
    addTradingStep,
    fetchTradingSystem,
    removeTradingCriterion,
    updateTradingCriteria,
    removeTradingStep,
    removeTradingPair,
    updateTradingPairs,
    updateTradingSteps,
    updateTradingSystem,
  };
};
