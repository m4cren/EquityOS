import { TaskTypeChoice } from "@/store/taskSlice/types";
import classNames from "classnames";
import { AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { taskCategoryBg } from "./TodoList";

interface Props {
  task_id: string;
  title: string;
  created_at: Date;
  progress: number;
  time_diff: string;
  handleFinish: (id: string, title: string) => void;
  type: string;
}
const List = ({
  handleFinish,
  time_diff,
  task_id,
  progress,
  title,
  type,
}: Props) => {
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const pct = Math.min(100, Math.round(progress * 100));

  return (
    <li
      className={classNames(
        "relative bg-card rounded-lg overflow-hidden p-2.5 min-h-18 flex flex-col gap-2",
        {
          "finish-task-animation": isFinished,
        }
      )}
    >
      <div className="flex items-center justify-between w-full">
        <p className="text-base font-semibold">{title}</p>
        <span
          className={`${
            type ? `${taskCategoryBg[type as TaskTypeChoice].bgX}` : ""
          } py-0.5 px-2 font-medium  text-[0.65rem] rounded-md w-fit`}
        >
          {type}
        </span>
      </div>

      <div className="flex justify-between gap-2">
        <div className="flex flex-col gap-1">
          {time_diff === "Overdue" ? (
            <p className="text-[0.65rem] text-red-500 bg-red-500/15 px-1 py-0.5 rounded-md flex items-center gap-1">
              Overdue
              <AlertCircle size={12} />
            </p>
          ) : (
            <p className="text-[0.65rem]">{time_diff}</p>
          )}
        </div>
        <button
          onClick={() => {
            setIsFinished(true);
            handleFinish(task_id, title);
          }}
          className="p-1 w-fit hover:bg-white/20 transition duration-200 cursor-pointer border-2 border-white/10 rounded-md"
        >
          <Check size={12} />
        </button>
      </div>
      <div
        style={{ width: `${100 - pct}%` }}
        className={classNames(
          "h-0.75 absolute bottom-0 left-0  transition-all opacity-20",
          pct > 75 ? "bg-red-500" : pct > 40 ? "bg-yellow-500" : "bg-green-500"
        )}
      ></div>
    </li>
  );
};

export default List;
