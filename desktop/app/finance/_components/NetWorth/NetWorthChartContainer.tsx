"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomTooltip } from "@/app/_components/CustomToolTip";
import { NetWorthTypes } from "@/lib/types";

export default function NetWorthChartContent({
  sortedData,
  isBalanceShown,
}: {
  sortedData: NetWorthTypes[];
  isBalanceShown: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={sortedData} layout="horizontal">
        <CartesianGrid vertical={false} opacity={0.1} />
        <XAxis dataKey="date_str" />
        <YAxis />
        {isBalanceShown && (
          <Tooltip content={CustomTooltip} isAnimationActive={false} />
        )}
        <Line type="monotone" dataKey="balance" stroke="#d4d4d4" />
      </LineChart>
    </ResponsiveContainer>
  );
}
