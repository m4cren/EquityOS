import { Day } from "@/hooks/useCalendar";
import classNames from "classnames";
import React from "react";

const PNLDayCell: React.FC<{ day: Day }> = ({ day }) => {
  const classes = [
    " text-center  text-[1.1vw] absolute bottom-2 right-2 ",
    day.isCurrentMonth ? "text-[#d4d4d4]" : "text-[#d4d4d440]",
    day.isToday ? "text-white font-semibold text-card" : "",
  ].join(" ");

  return (
    <div
      className={classNames(
        "relative cursor-pointer w-full p-2 rounded-md h-27 ",
        {
          "bg-card": day.isToday,
          "bg-transparent border border-card": !day.isToday,
        }
      )}
    >
      <p className={classes}>{day.date.getDate()}</p>{" "}
    </div>
  );
};

export default PNLDayCell;
