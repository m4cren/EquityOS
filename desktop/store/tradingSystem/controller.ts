import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/app/service/api-client";
import { TradingSystem, SystemCriterion } from "@/lib/types";

export const fetchTradingSystem = createAsyncThunk<TradingSystem | null>(
  "tradingSystem/fetchTradingSystem",
  async () => {
    const data = await api<TradingSystem | null>({
      endpoint: "/trading/system/fetch-system",
      method: "GET",
    });

    return data || null;
  }
);

export const createTradingSystem = createAsyncThunk<
  TradingSystem,
  TradingSystem
>("tradingSystem/createTradingSystem", async (system) => {
  const data = await api<TradingSystem, TradingSystem>({
    endpoint: "/trading/system/create-system",
    method: "POST",
    body: system,
  });

  return data;
});

export const updateTradingSystem = createAsyncThunk<
  TradingSystem,
  TradingSystem
>("tradingSystem/updateTradingSystem", async (system) => {
  const data = await api<TradingSystem, TradingSystem>({
    endpoint: "/trading/system/update-system",
    method: "PATCH",
    body: system,
  });

  return data;
});

export const addTradingPair = createAsyncThunk<TradingSystem, { pair: string }>(
  "tradingSystem/addTradingPair",
  async (body) => {
    const data = await api<TradingSystem, typeof body>({
      endpoint: "/trading/system/add-pair",
      method: "PATCH",
      body,
    });

    return data;
  }
);

export const removeTradingPair = createAsyncThunk<
  TradingSystem,
  { pair: string }
>("tradingSystem/removeTradingPair", async (body) => {
  const data = await api<TradingSystem, typeof body>({
    endpoint: "/trading/system/remove-pair",
    method: "PATCH",
    body,
  });

  return data;
});

export const updateTradingPairs = createAsyncThunk<
  TradingSystem,
  { pairs: string[] }
>("tradingSystem/updateTradingPairs", async (body) => {
  const data = await api<TradingSystem, typeof body>({
    endpoint: "/trading/system/update-pairs",
    method: "PATCH",
    body,
  });

  return data;
});

export const addTradingStep = createAsyncThunk<TradingSystem, { step: string }>(
  "tradingSystem/addTradingStep",
  async (body) => {
    const data = await api<TradingSystem, typeof body>({
      endpoint: "/trading/system/add-step",
      method: "PATCH",
      body,
    });

    return data;
  }
);

export const removeTradingStep = createAsyncThunk<
  TradingSystem,
  { index: number }
>("tradingSystem/removeTradingStep", async (body) => {
  const data = await api<TradingSystem, typeof body>({
    endpoint: "/trading/system/remove-step",
    method: "PATCH",
    body,
  });

  return data;
});

export const updateTradingSteps = createAsyncThunk<
  TradingSystem,
  { steps: string[] }
>("tradingSystem/updateTradingSteps", async (body) => {
  const data = await api<TradingSystem, typeof body>({
    endpoint: "/trading/system/update-steps",
    method: "PATCH",
    body,
  });

  return data;
});

export const addTradingCriterion = createAsyncThunk<
  TradingSystem,
  { criterion: SystemCriterion }
>("tradingSystem/addTradingCriterion", async (body) => {
  const data = await api<TradingSystem, typeof body>({
    endpoint: "/trading/system/add-criterion",
    method: "PATCH",
    body,
  });

  return data;
});

export const removeTradingCriterion = createAsyncThunk<
  TradingSystem,
  { id: string }
>("tradingSystem/removeTradingCriterion", async (body) => {
  const data = await api<TradingSystem, typeof body>({
    endpoint: "/trading/system/remove-criterion",
    method: "PATCH",
    body,
  });

  return data;
});

export const updateTradingCriteria = createAsyncThunk<
  TradingSystem,
  { criteria: SystemCriterion[] }
>("tradingSystem/updateTradingCriteria", async (body) => {
  const data = await api<TradingSystem, typeof body>({
    endpoint: "/trading/system/update-criteria",
    method: "PATCH",
    body,
  });

  return data;
});
