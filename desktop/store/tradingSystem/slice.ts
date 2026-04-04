import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SystemCriterion, TradingSystem } from "@/lib/types";

export const demoTradingSystem: TradingSystem = {
  id: "90201dj0",
  name: "ICT",
  description: "ICT-based intraday model",
  edgeSummary:
    "Look for liquidity sweep, MSS, displacement, and POI reaction before entry.",
  notes: "Only take A+ setups during preferred session.",
  steps: [
    "Mark higher timeframe bias",
    "Wait for liquidity sweep",
    "Confirm MSS",
    "Wait for displacement",
    "Look for POI mitigation",
    "Execute refined entry",
  ],
  pairs: ["EURUSD", "AUDUSD", "GBPUSD", "BTCUSD"],
  criteria: [
    { id: "isRefined", label: "Refined entry", required: true },
    {
      id: "isBelowOrAboveOpeningPrice",
      label: "Above / Below opening price",
      required: true,
    },
    { id: "isMssOccured", label: "MSS occurred", required: true },
    { id: "isIFVG", label: "IFVG", required: true },
    { id: "isFVG", label: "FVG", required: true },
    { id: "isDisplacement", label: "Displacement", required: true },
    { id: "isLiquiditySweep", label: "Liquidity sweep", required: true },
    { id: "isPoiMitigated", label: "POI mitigated", required: true },
    { id: "test", label: "Test", required: true },
  ],
};

type TradingSystemState = {
  tradingSystem: TradingSystem | null;
  isPending: boolean;
  errMsg: string | null;
};

const initialState: TradingSystemState = {
  tradingSystem: demoTradingSystem,
  isPending: false,
  errMsg: null,
};

const tradingSystemSlice = createSlice({
  name: "tradeSystem",
  initialState,
  reducers: {
    updateTradingSystemField: (
      state,
      action: PayloadAction<{
        field: keyof Pick<
          TradingSystem,
          "name" | "description" | "edgeSummary" | "notes"
        >;
        value: string;
      }>
    ) => {
      if (!state.tradingSystem) return;
      const { field, value } = action.payload;
      state.tradingSystem[field] = value;
    },

    addTradingSystemPair: (state, action: PayloadAction<string>) => {
      if (!state.tradingSystem) return;

      const value = action.payload.trim().toUpperCase();
      if (!value) return;
      if (state.tradingSystem.pairs.includes(value)) return;

      state.tradingSystem.pairs.push(value);
    },

    updateTradingSystemPair: (
      state,
      action: PayloadAction<{ index: number; value: string }>
    ) => {
      if (!state.tradingSystem) return;

      const { index, value } = action.payload;
      if (index < 0 || index >= state.tradingSystem.pairs.length) return;

      state.tradingSystem.pairs[index] = value.trim().toUpperCase();
    },

    removeTradingSystemPair: (state, action: PayloadAction<number>) => {
      if (!state.tradingSystem) return;

      state.tradingSystem.pairs = state.tradingSystem.pairs.filter(
        (_, index) => index !== action.payload
      );
    },

    addTradingSystemStep: (state, action: PayloadAction<string>) => {
      if (!state.tradingSystem) return;

      const value = action.payload.trim();
      if (!value) return;

      state.tradingSystem.steps.push(value);
    },

    updateTradingSystemStep: (
      state,
      action: PayloadAction<{ index: number; value: string }>
    ) => {
      if (!state.tradingSystem) return;

      const { index, value } = action.payload;
      if (index < 0 || index >= state.tradingSystem.steps.length) return;

      state.tradingSystem.steps[index] = value;
    },

    removeTradingSystemStep: (state, action: PayloadAction<number>) => {
      if (!state.tradingSystem) return;

      state.tradingSystem.steps = state.tradingSystem.steps.filter(
        (_, index) => index !== action.payload
      );
    },

    addTradingSystemCriterion: (
      state,
      action: PayloadAction<SystemCriterion>
    ) => {
      if (!state.tradingSystem) return;

      const value = action.payload;
      if (!value.id.trim() || !value.label.trim()) return;

      const exists = state.tradingSystem.criteria.some(
        (item) => item.id === value.id
      );
      if (exists) return;

      state.tradingSystem.criteria.push(value);
    },

    updateTradingSystemCriterion: (
      state,
      action: PayloadAction<{
        id: string;
        updates: Partial<SystemCriterion>;
      }>
    ) => {
      if (!state.tradingSystem) return;

      const { id, updates } = action.payload;
      const target = state.tradingSystem.criteria.find(
        (item) => item.id === id
      );
      if (!target) return;

      Object.assign(target, updates);
    },

    removeTradingSystemCriterion: (state, action: PayloadAction<string>) => {
      if (!state.tradingSystem) return;

      state.tradingSystem.criteria = state.tradingSystem.criteria.filter(
        (item) => item.id !== action.payload
      );
    },

    resetTradingSystem: (state) => {
      state.tradingSystem = {
        ...demoTradingSystem,
        steps: [...demoTradingSystem.steps],
        pairs: [...demoTradingSystem.pairs],
        criteria: demoTradingSystem.criteria.map((item) => ({ ...item })),
      };
      state.isPending = false;
      state.errMsg = null;
    },

    setTradingSystemPending: (state, action: PayloadAction<boolean>) => {
      state.isPending = action.payload;
    },

    setTradingSystemError: (state, action: PayloadAction<string | null>) => {
      state.errMsg = action.payload;
    },
  },
});

export const {
  updateTradingSystemField,
  addTradingSystemPair,
  updateTradingSystemPair,
  removeTradingSystemPair,
  addTradingSystemStep,
  updateTradingSystemStep,
  removeTradingSystemStep,
  addTradingSystemCriterion,
  updateTradingSystemCriterion,
  removeTradingSystemCriterion,
  resetTradingSystem,
  setTradingSystemPending,
  setTradingSystemError,
} = tradingSystemSlice.actions;

export default tradingSystemSlice.reducer;
