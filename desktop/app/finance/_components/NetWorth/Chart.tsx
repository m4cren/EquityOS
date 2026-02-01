"use client";

import { CustomTooltip } from "@/app/_components/CustomToolTip";
import { sort } from "fast-sort";
import { Funnel, Landmark } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const monthMap: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

export const getMonthYear = (date: string) => {
  const [month, , year] = date.split(" ");
  return `${month} ${year}`;
};

const getYear = (date: string) => {
  const [, , year] = date.split(" ");
  return `${year}`;
};

// 🔹 STATIC DUMMY NET WORTH HISTORY
const netWorth = [
  { date_str: "Jan 05 2024", balance: 12000 },
  { date_str: "Feb 05 2024", balance: 14500 },
  { date_str: "Mar 05 2024", balance: 16200 },
  { date_str: "Apr 05 2024", balance: 17800 },
  { date_str: "May 05 2024", balance: 20100 },
  { date_str: "Jun 05 2024", balance: 23000 },
  { date_str: "Jul 05 2024", balance: 25500 },
  { date_str: "Aug 05 2024", balance: 28900 },
  { date_str: "Sep 05 2024", balance: 31000 },
  { date_str: "Oct 05 2024", balance: 34200 },
  { date_str: "Nov 05 2024", balance: 38100 },
  { date_str: "Dec 05 2024", balance: 42000 },
];

// 🔹 Static filter mode
const filterChart: "Month" | "Year" | null = "Month";
const isBalanceShown = true;

const sortData = (
  array: { date_str: string; balance: number }[],
  filterer: typeof filterChart
) => {
  if (filterer === "Month" || filterer === "Year") {
    const reduced = array.reduce((acc, curr) => {
      const key =
        filterer === "Month"
          ? getMonthYear(curr.date_str)
          : getYear(curr.date_str);

      const stored = acc[key];

      if (!stored || new Date(curr.date_str) > new Date(stored.date_str)) {
        acc[key] = {
          date_str: curr.date_str,
          balance: curr.balance,
        };
      }
      return acc;
    }, {} as Record<string, { date_str: string; balance: number }>);

    const final: Record<string, number> = {};
    for (const [key, value] of Object.entries(reduced)) {
      final[key] = value.balance;
    }

    return final;
  }

  return array.reduce((acc, curr) => {
    if (!acc[curr.date_str]) acc[curr.date_str] = 0;
    acc[curr.date_str] += curr.balance;
    return acc;
  }, {} as Record<string, number>);
};

const Chart = () => {
  const convertToArray = Object.entries(sortData(netWorth, filterChart)).map(
    ([date_str, balance]) => ({
      balance,
      date_str,
    })
  );

  const sortedData = sort(convertToArray).asc((item) => {
    if (filterChart === "Month") {
      const [monthStr, year] = item.date_str.split(" ");
      const month = monthMap[monthStr];
      return new Date(`${year}-${month}`).getTime();
    } else {
      return new Date(item.date_str).getTime();
    }
  });

  return (
    <div className="relative flex flex-col gap-[1vw] w-full h-[33vw] border-2 border-card rounded-[0.5vw] p-[1.25vw]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.6vw]">
          <Landmark size={18} />
          <h1 className="text-[0.9vw] font-medium opacity-50">
            Net Worth (Cash-based)
          </h1>
        </div>
        <button className="cursor-not-allowed opacity-40">
          <Funnel />
        </button>
      </div>

      <hr className="text-card border-2" />

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sortedData}>
          <CartesianGrid vertical={false} opacity={0.1} />
          <XAxis
            dataKey="date_str"
            tick={{ fontFamily: "Inter", fontSize: 10, fill: "#d4d4d470" }}
          />
          <YAxis
            tick={{ fontFamily: "Inter", fontSize: 10, fill: "#d4d4d490" }}
          />
          <Tooltip content={CustomTooltip} isAnimationActive={false} />
          <Line type="monotone" dataKey="balance" stroke="#d4d4d4" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
