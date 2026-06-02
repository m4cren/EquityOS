import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTradeLevel } from "./controller";

type TradeLevelStateTypes = {
  xp_lvl: number;
  isPending: boolean;
  errMsg: string | null;
};

const initialState: TradeLevelStateTypes = {
  xp_lvl: 0,
  errMsg: null,
  isPending: false,
};

const tradeLevelSlice = createSlice({
  name: "tradeLevelSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchTradeLevel.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.isPending = false;
          state.xp_lvl = action.payload;
        }
      )
      .addCase(fetchTradeLevel.pending, (state) => {
        state.isPending = true;
      });
  },
});

export const {} = tradeLevelSlice.actions;

export default tradeLevelSlice.reducer;
