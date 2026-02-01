"use client";

import { CustomTooltip } from "@/app/_components/CustomToolTip";
import { useFinanceAccount } from "@/store/financeAccountSlice/useFinanceAccount";
import { BarChart2 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = () => {
  const { accounts } = useFinanceAccount();
  return (
    <div className="relative flex flex-col gap-[1vw] w-[20vw] h-[22vw] border-2 border-card rounded-[0.5vw] p-[1.25vw]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.6vw]">
          <BarChart2 size={18} />
          <h1 className="text-[0.9vw] font-medium opacity-50">
            Balance Distribution
          </h1>
        </div>
      </div>

      <hr className="text-card border-2" />

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={accounts}>
          <CartesianGrid vertical={false} opacity={0.1} />
          <XAxis
            dataKey="name"
            tick={{ fontFamily: "Inter", fontSize: 8, fill: "#d4d4d470" }}
            angle={30}
            tickMargin={5}
          />
          <YAxis
            width={20}
            tick={{
              fontFamily: "Inter",
              fontSize: 8,
              fill: "#d4d4d490",
            }}
          />

          <Tooltip
            content={CustomTooltip}
            isAnimationActive={false}
            cursor={false}
          />

          <Bar
            dataKey="balance"
            fill="#fa8c01"
            radius={[5, 5, 0, 0]}
            barSize={27}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
