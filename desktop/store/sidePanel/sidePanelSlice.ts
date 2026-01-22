import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const sidePanelSlice = createSlice({
  name: "sidePanelToggle",
  initialState: initialState,
  reducers: {
    openPanel: () => true,
    closePanel: () => false,
  },
});

export const { openPanel, closePanel } = sidePanelSlice.actions;
export default sidePanelSlice.reducer;
