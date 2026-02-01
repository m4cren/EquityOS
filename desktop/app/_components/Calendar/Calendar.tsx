"use client";
import React from "react";
import useCalendar from "@/hooks/useCalendar";
import DayCell from "./DayCell";
import { TaskTypes } from "@/store/taskSlice/types";
import CategoryLegend from "../TodoList/CategoryLegend";
interface Props {
  tasks: TaskTypes[];
}
const Calendar = ({ tasks }: Props) => {
  const { days, monthLabel, prevMonth, nextMonth } = useCalendar();

  return (
    <div className="w-full max-w-[30vw]  mx-auto bg-transparent shadow-md rounded-[0.7vw] p-[1.1vw]">
      <header className="flex justify-between items-center mb-[1.75vw]">
        <button
          onClick={prevMonth}
          className="text-[1.5vw] px-[0.8vw] py-[0.4vw] rounded hover:bg-[#d4d4d4]"
        >
          &lt;
        </button>
        <h2 className="text-[1.6vw] font-semibold">{monthLabel}</h2>
        <button
          onClick={nextMonth}
          className="text-[1.5vw] px-[0.8vw] py-[0.4vw] rounded hover:bg-[#d4d4d4]"
        >
          &gt;
        </button>
      </header>
      <div className="grid grid-cols-7 mb-[1.5vw] text-[1vw] font-medium ">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>
      <div className=" grid grid-cols-7 gap-[0.4vw] ">
        {days.map((day) => {
          const tasksonThisDate = tasks.filter(({ deadline }) => {
            const d = new Date(deadline); // convert string → Date
            return (
              d.getFullYear() === day.date.getFullYear() &&
              d.getMonth() === day.date.getMonth() &&
              d.getDate() === day.date.getDate()
            );
          });

          return (
            <DayCell
              key={day.date.toISOString()}
              day={day}
              tasks={tasksonThisDate}
            />
          );
        })}
      </div>
      {/* <CategoryLegend /> */}
    </div>
  );
};

export default Calendar;
