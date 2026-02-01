"use client";
import Clock from "./Clock/Clock";

import Calendar from "./Calendar/Calendar";
import TodoList from "./TodoList/TodoList";
import { useTask } from "@/store/taskSlice/useTask";

const Homepage = () => {
  const { err_msg, is_pending, tasks, addTask, dispatch, finishTask } =
    useTask();
  return (
    <main className="relative flex flex-col w-full justify-between h-screen p-10">
      <div className="flex  justify-between w-full gap-10 ">
        <Clock />
        <TodoList
          addTask={addTask}
          dispatch={dispatch}
          err_msg={err_msg}
          finishTask={finishTask}
          is_pending={is_pending}
          tasks={tasks}
        />
        <div className="w-100">
          <Calendar tasks={tasks} />
        </div>
      </div>
      <Quote />
    </main>
  );
};

export default Homepage;

const Quote = () => {
  return (
    <div className="flex items-center gap-2 pb-8">
      <div className="bg-[#262626] w-1 h-16"></div>
      <p className="text-[1.1vw]">
        <i>
          &quot;Increase your income, Increase your savings, Increase your
          investment returns, <br />
          Decrease your expenses&quot;
        </i>
      </p>
    </div>
  );
};
