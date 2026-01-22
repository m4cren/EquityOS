import { usePopupController } from "@/hooks/usePopupController";
import { TaskTypeChoice, TaskTypes } from "@/store/taskSlice/types";
import { useTask } from "@/store/taskSlice/useTask";
import classNames from "classnames";
import {
  File,
  FileQuestion,
  House,
  LucideIcon,
  PersonStanding,
  Plus,
  School,
  Users,
  Wallet,
} from "lucide-react";
import AddTask from "./AddTask";
import Head from "./Head";
import List from "./List";
import TaskSkeleton from "./TaskSkeleton";
import { useEffect, useState } from "react";
import { diffProgress, diffStatus } from "@/lib/timeDiff";
import {
  AsyncThunk,
  AsyncThunkConfig,
  Dispatch,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";

export const taskCategoryBg: Record<
  TaskTypeChoice,
  { bg: string; icon: LucideIcon }
> = {
  Study: { bg: "bg-indigo-500", icon: School },
  Personal: { bg: "bg-rose-500", icon: PersonStanding },
  Work: { bg: "bg-amber-500", icon: File },
  Home: { bg: "bg-emerald-500", icon: House },
  Errands: { bg: "bg-violet-500", icon: Wallet },
  Appointment: { bg: "bg-blue-500", icon: Users },
  Others: { bg: "bg-gray-400", icon: FileQuestion },
};

interface Props {
  finishTask: AsyncThunk<
    TaskTypes[] | undefined,
    {
      id: string;
      title: string;
    },
    AsyncThunkConfig
  >;
  dispatch: ThunkDispatch<
    {
      sidePanel: boolean;
      tasks: {
        is_pending: boolean;
        err_msg: string | null;
        tasks: TaskTypes[];
      };
    },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>;
  addTask: AsyncThunk<
    TaskTypes[] | undefined,
    {
      title: string;
      deadline: string;
      type: TaskTypeChoice;
    },
    AsyncThunkConfig
  >;
  tasks: TaskTypes[];
  is_pending: boolean;
  err_msg: string | null;
}

const TodoList = ({
  addTask,
  dispatch,
  err_msg,
  finishTask,
  is_pending,
  tasks,
}: Props) => {
  const controller = usePopupController();
  const { handleOpen, isOpen } = controller;

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000); // update every minute
    return () => clearInterval(id);
  }, []);

  const handleAddTask = (
    title: string,
    deadline: string,
    type: TaskTypeChoice
  ) => {
    dispatch(addTask({ title, deadline, type }));
  };

  const handleFinishTask = (id: string, title: string) => {
    dispatch(finishTask({ id, title }));
  };
  const sortedTasks = [...tasks].sort((a, b) => {
    const A = diffStatus(new Date(now), a.deadline);
    const B = diffStatus(new Date(now), b.deadline);

    if (A.isOverdue && !B.isOverdue) return 1;
    if (!A.isOverdue && B.isOverdue) return -1;

    return A.totalMinutes - B.totalMinutes;
  });

  return (
    <div className="w-125 relative flex flex-col h-135 gap-4 mt-6 px-4">
      {isOpen && (
        <AddTask modalController={controller} addTask={handleAddTask} />
      )}
      <Head />
      <hr className="text-white/20" />
      <ul className=" flex flex-col gap-2 h-full  pb-50 overflow-y-scroll mask-[linear-gradient(to_top,transparent,black_69%)] [-webkit-mask-image:linear-gradient(to_top,transparent,black_69%)]">
        {sortedTasks.length > 0 ? (
          sortedTasks.map(({ id, type, deadline, title, uuid, created_at }) => {
            const { text, progress } = diffProgress(
              created_at,
              new Date(now),
              deadline
            );

            return (
              <List
                progress={progress}
                time_diff={text}
                key={`${uuid}-${id}-${created_at}`}
                handleFinish={handleFinishTask}
                task_id={id}
                type={type}
                created_at={created_at}
                title={title}
              />
            );
          })
        ) : is_pending ? (
          <TaskSkeleton />
        ) : (
          <>
            <p className="text-xs opacity-60 text-center py-4">No tasks</p>
            <AddTaskButton haveLists={false} handleOpen={handleOpen} />
          </>
        )}
      </ul>
      {tasks.length > 0 && <AddTaskButton haveLists handleOpen={handleOpen} />}
    </div>
  );
};

export default TodoList;

const AddTaskButton = ({
  haveLists = true,
  handleOpen,
}: {
  haveLists: boolean;
  handleOpen: () => void;
}) => {
  return (
    <button
      onClick={handleOpen}
      className={classNames(
        " rounded-xl flex items-center gap-1 justify-center text-sm font-semibold  h-12 cursor-pointer bg-[#202020] ",
        {
          "absolute bottom-0 left-5 right-5": haveLists,
        }
      )}
    >
      Add task <Plus size={20} />
    </button>
  );
};
