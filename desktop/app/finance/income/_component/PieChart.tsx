"use client";

import { IncomeCategoryTypes } from "@/lib/types";
import { PieChartIcon } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { incomeColorTypeMap } from "./IncomeTypes";
import { CustomTooltip } from "@/app/_components/CustomToolTip";
import { useIncomeSummary } from "@/hooks/useIncomeSummary";

const isBalanceShown = true;

const PieChartComponent = () => {
  const { incomeOverallDistribution } = useIncomeSummary();
  return (
    <div className="relative flex flex-col gap-[1vw] w-full h-[33vw] border-2 border-card rounded-[0.5vw] p-[1.25vw]">
      <div className="flex items-center gap-[0.6vw]">
        <PieChartIcon size={18} />
        <h1 className="text-[0.9vw] font-medium opacity-50">
          Overall Income Chart
        </h1>
      </div>

      <hr className="text-card border-2" />

      {incomeOverallDistribution.length !== 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={incomeOverallDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              innerRadius={100}
              dataKey="amount"
              fill="transparent"
              strokeWidth={10}
              stroke="transparent"
              paddingAngle={1}
            >
              {incomeOverallDistribution.map((entry) => (
                <Cell
                  key={`cell-${entry.income_type}`}
                  fill={
                    incomeColorTypeMap[entry.income_type as IncomeCategoryTypes]
                  }
                />
              ))}
            </Pie>

            {isBalanceShown && <Tooltip content={CustomTooltip} />}
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
          You have no income data
        </p>
      )}
    </div>
  );
};

export default PieChartComponent;
