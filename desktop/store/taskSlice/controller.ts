import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskTypeChoice, TaskTypes } from "./types";

import { api } from "@/app/service/api-client";

export const fetchTasks = createAsyncThunk<TaskTypes[]>(
  "tasks/fetchTasks",
  async () => {
    const data = await api<TaskTypes[]>({ endpoint: "/tasks", method: "GET" });

    return data || [];
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (
    task: { title: string; deadline: string; type: TaskTypeChoice },
    thunAPI
  ) => {
    const { dispatch } = thunAPI;

    if (!task) return;

    await api<void, typeof task>({
      endpoint: "/tasks",
      method: "POST",
      body: task,
    });
    return await dispatch(fetchTasks()).unwrap();
  }
);

export const finishTask = createAsyncThunk(
  "tasks/finishTask",
  async (task: { id: string; title: string }, thunAPI) => {
    const { dispatch } = thunAPI;

    if (!task) return;

    await api<void, typeof task>({
      endpoint: "/tasks",
      method: "DELETE",
      body: task,
    });
    return await dispatch(fetchTasks()).unwrap();
  }
);
