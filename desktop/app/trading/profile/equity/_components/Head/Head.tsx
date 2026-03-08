import { ArrowUp } from "lucide-react";
import React from "react";

const Head = () => {
  const value = 0.9; // -100 → 100
  const max = 25;

  const percent = (Math.abs(value) / max) * 50;
  const isPositive = value >= 0;
  return (
    <div className="flex justify-between w-full items-center ">
      <div className="flex gap-2">
        <p className="text-5xl font-semibold">$100,932</p>
        <span className="flex text-[0.9rem]">
          <ArrowUp size={18} />
          0.9%
        </span>
      </div>

      <div className="flex items-center gap-1">
        <p className="font-semibold text-[0.7rem] text-red-400">-25%</p>
        <div className="bg-white/10 w-100 relative h-2 rounded-md ">
          <div
            style={{
              width: `${percent}%`,
              left: isPositive ? "50%" : undefined,
              right: !isPositive ? "50%" : undefined,
            }}
            className={`
            absolute h-full
            ${
              isPositive
                ? "bg-green-600 rounded-r-md"
                : "bg-red-500 rounded-l-md"
            }
          `}
          />
          <span className="absolute w-0.5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 bg-white" />
        </div>
        <p className="font-semibold text-[0.7rem] text-green-400">+25%</p>
      </div>
    </div>
  );
};

export default Head;
