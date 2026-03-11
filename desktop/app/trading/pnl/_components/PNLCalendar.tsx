"use client";
import useCalendar from "@/hooks/useCalendar";
import PNLDayCell from "./PNLDayCell";
import { Plus } from "lucide-react";
import CalendarSummary from "./CalendarSummary";

const PNLCalendar = () => {
  const {
    days,
    monthLabel,
    prevMonth,
    nextMonth,
    current: currentDate,
  } = useCalendar();

  const today = new Date();

  const isSameMonthAndYear =
    currentDate.getFullYear() === today.getFullYear() &&
    currentDate.getMonth() === today.getMonth();

  return (
    <div className="grid grid-cols-[4fr_1.25fr] gap-4 items-stretch">
      <div className="w-full max-w-[80vw] bg-transparent shadow-md rounded-[0.7vw] p-[1.1vw]">
        <header className="flex justify-between items-center mb-[1.75vw]">
          <div className="flex items-center gap-6">
            <h2 className="text-[1.6vw] font-semibold">{monthLabel}</h2>

            {isSameMonthAndYear && (
              <button className="flex items-center cursor-pointer gap-2 bg-card rounded-md py-1.5 px-4 text-sm">
                <Plus size={16} />
                Log Trade
              </button>
            )}
          </div>

          <div>
            <button
              onClick={prevMonth}
              className="text-[1.5vw] cursor-pointer transition duration-150 px-[0.8vw] py-[0.4vw] rounded hover:bg-card"
            >
              &lt;
            </button>
            <button
              onClick={nextMonth}
              className="text-[1.5vw] cursor-pointer transition duration-150 px-[0.8vw] py-[0.4vw] rounded hover:bg-card"
            >
              &gt;
            </button>
          </div>
        </header>

        <div className="grid grid-cols-7 mb-[1.5vw] text-[1vw] font-medium ">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 place-items-center gap-1.5">
          {days.map((day) => {
            return <PNLDayCell key={day.date.toISOString()} day={day} />;
          })}
        </div>
      </div>

      <CalendarSummary
        days={days}
        monthLabel={monthLabel}
        currentDate={currentDate}
      />
    </div>
  );
};

export default PNLCalendar;
