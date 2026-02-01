import { Day } from "@/hooks/useCalendar";
import { TaskTypeChoice, TaskTypes } from "@/store/taskSlice/types";
import React from "react";
import { taskCategoryBg } from "../TodoList/TodoList";

const DayCell: React.FC<{ day: Day; tasks: TaskTypes[] }> = ({
  day,
  tasks,
}) => {
  const MAX = 5;
  const visible = tasks.slice(0, MAX);
  const remaining = tasks.length - MAX;
  const classes = [
    "p-2.5  text-center relative rounded-[0.5vw] cursor-pointer text-[1.1vw]",
    day.isCurrentMonth ? "text-[#d4d4d4]" : "text-[#d4d4d440]",
    day.isToday
      ? "bg-[#202020] font-semibold text-white"
      : "hover:bg-[#262626] hover:text-white",
  ].join(" ");
  const typeCounts = tasks.reduce<Record<string, number>>((acc, t) => {
    acc[t.type] = (acc[t.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className={`${classes} group`}>
      {day.date.getDate()}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-0.5">
        {visible.map(({ type, uuid, id, created_at }, idx) => {
          const isLast = idx === MAX - 1 && remaining > 0;

          if (isLast) {
            return (
              <span
                key="more"
                className="w-3 h-3 rounded-full bg-white/12 text-[0.45rem] flex items-center justify-center text-white"
              >
                +{remaining}
              </span>
            );
          }

          return (
            <span
              key={`${uuid}-${id}-${created_at}`}
              className={`${
                type ? taskCategoryBg[type as TaskTypeChoice].bg : ""
              } w-2 h-2 rounded-full opacity-70`}
            />
          );
        })}
      </div>
      {tasks.length > 0 && (
        <div
          className="absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2
                  hidden group-hover:block
                  bg-[#1e1e1e] text-[0.65rem] text-white
                  px-2 py-1 rounded shadow-lg border border-white/10"
        >
          {Object.entries(typeCounts).map(([type, count]) => (
            <div
              key={type}
              className="flex items-center gap-1 whitespace-nowrap"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  taskCategoryBg[type as TaskTypeChoice].bg
                }`}
              />
              <span>
                {type} {count > 1 && `(${count})`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DayCell;
