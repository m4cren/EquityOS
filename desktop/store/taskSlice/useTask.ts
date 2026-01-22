import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchTasks, addTask, finishTask } from "./controller";

export const useTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { err_msg, is_pending, tasks } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return { tasks, is_pending, err_msg, addTask, dispatch, finishTask };
};
