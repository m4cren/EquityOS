import { createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { TradingSystem } from "@/lib/types";
import {
  fetchTradingSystem,
  createTradingSystem,
  updateTradingSystem,
  addTradingPair,
  removeTradingPair,
  updateTradingPairs,
  addTradingStep,
  removeTradingStep,
  updateTradingSteps,
  addTradingCriterion,
  removeTradingCriterion,
  updateTradingCriteria,
} from "./controller";

type TradingSystemState = {
  tradingSystem: TradingSystem | null;
  isPending: boolean;
  errMsg: string | null;
};

const initialState: TradingSystemState = {
  tradingSystem: null,
  isPending: false,
  errMsg: null,
};

const isTradingSystemPendingAction = (action: UnknownAction): boolean =>
  action.type.startsWith("tradingSystem/") && action.type.endsWith("/pending");

const isTradingSystemFulfilledAction = (action: UnknownAction): boolean =>
  action.type.startsWith("tradingSystem/") &&
  action.type.endsWith("/fulfilled");

const isTradingSystemRejectedAction = (action: UnknownAction): boolean =>
  action.type.startsWith("tradingSystem/") && action.type.endsWith("/rejected");

const getErrorMessage = (action: UnknownAction): string => {
  if (
    "error" in action &&
    action.error &&
    typeof action.error === "object" &&
    "message" in action.error &&
    typeof action.error.message === "string"
  ) {
    return action.error.message;
  }

  return "Something went wrong";
};

const tradingSystemSlice = createSlice({
  name: "tradeSystem",
  initialState,
  reducers: {
    setTradingSystemLocally: (
      state,
      action: PayloadAction<TradingSystem | null>
    ) => {
      state.tradingSystem = action.payload;
    },
    clearTradingSystemError: (state) => {
      state.errMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTradingSystem.pending, (state) => {
        state.isPending = true;
        state.errMsg = null;
      })
      .addCase(fetchTradingSystem.fulfilled, (state, action) => {
        state.isPending = false;
        state.tradingSystem = action.payload;
      })
      .addCase(fetchTradingSystem.rejected, (state, action) => {
        state.isPending = false;
        state.errMsg = action.error.message || "Failed to fetch trading system";
      })

      .addCase(createTradingSystem.pending, (state) => {
        state.isPending = true;
        state.errMsg = null;
      })
      .addCase(createTradingSystem.fulfilled, (state, action) => {
        state.isPending = false;
        state.tradingSystem = action.payload;
      })
      .addCase(createTradingSystem.rejected, (state, action) => {
        state.isPending = false;
        state.errMsg =
          action.error.message || "Failed to create trading system";
      })

      .addCase(updateTradingSystem.pending, (state) => {
        state.isPending = true;
        state.errMsg = null;
      })
      .addCase(updateTradingSystem.fulfilled, (state, action) => {
        state.isPending = false;
        state.tradingSystem = action.payload;
      })
      .addCase(updateTradingSystem.rejected, (state, action) => {
        state.isPending = false;
        state.errMsg =
          action.error.message || "Failed to update trading system";
      })

      .addCase(addTradingPair.fulfilled, (state, action) => {
        state.tradingSystem = action.payload;
      })
      .addCase(removeTradingPair.fulfilled, (state, action) => {
        state.tradingSystem = action.payload;
      })
      .addCase(updateTradingPairs.fulfilled, (state, action) => {
        state.tradingSystem = action.payload;
      })

      .addCase(addTradingStep.fulfilled, (state, action) => {
        state.tradingSystem = action.payload;
      })
      .addCase(removeTradingStep.fulfilled, (state, action) => {
        state.tradingSystem = action.payload;
      })
      .addCase(updateTradingSteps.fulfilled, (state, action) => {
        state.tradingSystem = action.payload;
      })

      .addCase(addTradingCriterion.fulfilled, (state, action) => {
        state.tradingSystem = action.payload;
      })
      .addCase(removeTradingCriterion.fulfilled, (state, action) => {
        state.tradingSystem = action.payload;
      })
      .addCase(updateTradingCriteria.fulfilled, (state, action) => {
        state.tradingSystem = action.payload;
      })

      .addMatcher(isTradingSystemPendingAction, (state) => {
        state.isPending = true;
        state.errMsg = null;
      })
      .addMatcher(isTradingSystemFulfilledAction, (state) => {
        state.isPending = false;
      })
      .addMatcher(isTradingSystemRejectedAction, (state, action) => {
        state.isPending = false;
        state.errMsg = getErrorMessage(action);
      });
  },
});

export const { setTradingSystemLocally, clearTradingSystemError } =
  tradingSystemSlice.actions;

export default tradingSystemSlice.reducer;
