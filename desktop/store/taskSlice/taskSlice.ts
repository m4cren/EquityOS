import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskTypes } from "./types";
import { fetchTasks } from "./controller";

const initialState: {
  is_pending: boolean;
  err_msg: string | null;
  tasks: TaskTypes[];
} = {
  is_pending: true,
  err_msg: null,
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTasks.fulfilled,
      (state, action: PayloadAction<TaskTypes[]>) => {
        state.is_pending = false;
        state.tasks = action.payload;
      }
    );
  },
});

export default taskSlice.reducer;
