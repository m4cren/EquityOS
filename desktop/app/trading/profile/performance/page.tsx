import React from "react";

const page = () => {
  const profit_rate = 30;

  return (
    <div className="grid grid-cols-2 gap-12  text-white">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-8 bg-white/5 p-8 rounded-2xl backdrop-blur-md border border-white/10">
        {/* Profit Rate */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: `conic-gradient(#C06D03 ${
                profit_rate * 3.6
              }deg, #3A2408 0deg)`,
            }}
          >
            <span className="bg-[#0A0A0A] text-2xl font-bold rounded-full w-24 h-24 flex items-center justify-center">
              {profit_rate}%
            </span>
          </div>

          <p className="text-sm text-white/60 tracking-wide">PROFIT RATE</p>
        </div>

        {/* Core stats */}
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <h5 className="text-3xl font-bold">3:25</h5>
            <p className="text-xs text-white/60">AVG RRR</p>
          </div>

          <div>
            <h5 className="text-3xl font-bold">219</h5>
            <p className="text-xs text-white/60">Closed Orders</p>
          </div>

          <div>
            <h5 className="text-xl font-semibold text-green-400">46</h5>
            <p className="text-xs text-white/60">Profits</p>
          </div>

          <div>
            <h5 className="text-xl font-semibold text-red-400">117</h5>
            <p className="text-xs text-white/60">Expenses</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col gap-8 bg-white/5 p-8 rounded-2xl backdrop-blur-md border border-white/10">
        {/* Net Profit */}
        <div className="text-center">
          <h5 className="text-3xl font-bold">Net Profit</h5>
          <p className="text-xl text-green-400 font-medium">+432 USD</p>
        </div>

        {/* Streaks */}
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-white/60">Profit Streak</p>
            <p className="text-lg font-semibold text-green-400">3</p>
          </div>

          <div>
            <p className="text-white/60">Expense Streak</p>
            <p className="text-lg font-semibold text-red-400">8</p>
          </div>
        </div>

        {/* Trade time */}
        <div className="text-center">
          <h5 className="text-3xl font-bold">1.5h</h5>
          <p className="text-sm text-white/60">AVG Trade Time</p>
        </div>

        {/* Risk metrics */}
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-white/60">Max Drawdown</p>
            <p className="text-lg font-semibold">7.6%</p>
          </div>

          <div>
            <p className="text-white/60">Expectancy</p>
            <p className="text-lg font-semibold">0.2 R</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
