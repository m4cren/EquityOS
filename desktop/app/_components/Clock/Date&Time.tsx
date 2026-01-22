import React from "react";

const DateTime = ({
  day,
  amPm,
  hour,
  minute,
}: {
  day: number;
  amPm: string;
  hour: number;
  minute: string;
}) => {
  return (
    <div className="flex flex-row gap-[0.5vw] items-center   justify-around">
      <div className="relative bg-[#202020] flex  py-[4vw] rounded-[0.7vw] w-[9vw]">
        <h3 className="text-[3.5vw] font-extrabold mx-auto"> {hour}</h3>
        <p className="text-[1vw] font-medium absolute bottom-[0.5vw] left-[0.75vw]">
          {amPm}
        </p>
      </div>
      <div className="relative bg-[#202020] flex w-[9vw] py-[4vw] rounded-[0.7vw]">
        <h3 className="text-[3.5vw] font-extrabold mx-auto">{minute}</h3>
        <p className="text-[1vw] font-medium absolute bottom-[0.5vw] right-[0.75vw]">
          {day === 1
            ? " Monday"
            : day === 2
            ? " Tuesday"
            : day === 3
            ? " Wednesday"
            : day === 4
            ? " Thursday"
            : day === 5
            ? " Friday"
            : day === 6
            ? " Saturday"
            : day === 0
            ? " Sunday"
            : null}
        </p>
      </div>
    </div>
  );
};

export default DateTime;
