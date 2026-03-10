import { ArrowUp, ArrowDown, ChevronDown } from "lucide-react";
import React from "react";

const Head = () => {
  const value = 0.9;
  const max = 25;

  const percent = (Math.abs(value) / max) * 50;
  const isPositive = value >= 0;

  return (
    <div className="flex justify-between items-start w-full">
      {/* LEFT SIDE */}
      <div className="flex items-start gap-3">
        <div>
          <p className="text-xs text-white/50 font-medium">Equity</p>
          <p className="text-5xl font-semibold tracking-tight">$100,932</p>
        </div>

        <span
          className={`flex items-center gap-1 text-sm pt-2 font-medium ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          {value}%
        </span>
      </div>

      {/* CENTER */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-white/50 font-medium">Performance Range</p>

        <div className="flex items-center gap-2">
          <p className="text-[0.7rem] font-semibold text-red-400">-25%</p>

          <div className="relative w-96 h-2 bg-white/10 rounded-md">
            <div
              style={{
                width: `${percent}%`,
                left: isPositive ? "50%" : undefined,
                right: !isPositive ? "50%" : undefined,
              }}
              className={`absolute h-full ${
                isPositive
                  ? "bg-green-500 rounded-r-md"
                  : "bg-red-500 rounded-l-md"
              }`}
            />

            <span className="absolute left-1/2 top-1/2 h-4 w-[2px] bg-white -translate-x-1/2 -translate-y-1/2" />
          </div>

          <p className="text-[0.7rem] font-semibold text-green-400">+25%</p>
        </div>
      </div>

      {/* RIGHT */}
      <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 transition px-4 py-2 rounded-lg text-sm font-medium border border-white/10">
        This Month
        <ChevronDown size={16} />
      </button>
    </div>
  );
};

export default Head;
