"use client";

import { FiltererTypes, NetWorthTypes } from "@/lib/types";
import { sort } from "fast-sort";
import { Eye, EyeClosed, Funnel, Landmark } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DateFilter from "./DateFilter";
import { useShowAmountContext } from "@/lib/context/showAmountProvider";
import { useNetworthState } from "@/store/netWorth/useNetWorth";
import { CustomTooltip } from "@/app/_components/CustomToolTip";
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
import dynamic from "next/dynamic";

const NetWorthChartContent = dynamic(() => import("./NetWorthChartContainer"), {
  ssr: false,
});

export const getMonthYear = (date: string) => {
  const [month, , year] = date.split(" ");

  return `${month} ${year}`;
};

const getYear = (date: string) => {
  const [, , year] = date.split(" ");

  return `${year}`;
};

const Chart = () => {
  const {
    netWorth: { isPending, netWorth },
  } = useNetworthState();
  const [filterChart, setFilterChart] = useState<FiltererTypes>(null);

  const sortData = (array: NetWorthTypes[], filterer: FiltererTypes) => {
    // Case 1: Month or Year → store latest balance per period
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

      // Flatten result to only return balances
      const final: Record<string, number> = {};
      for (const [key, value] of Object.entries(reduced)) {
        final[key] = value.balance;
      }

      return final;
    }

    // Case 2: Default (e.g., daily) → sum balances
    const summed = array.reduce((acc, curr) => {
      const key = curr.date_str;

      if (!acc[key]) {
        acc[key] = 0;
      }

      acc[key] += curr.balance;

      return acc;
    }, {} as Record<string, number>);

    return summed;
  };
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

  const [isFilter, setIsFilter] = useState<boolean>(false);

  const { isBalanceShown } = useShowAmountContext();

  return (
    <div className="relative flex flex-col gap-[1vw] w-full  h-[33vw] border-2 border-card rounded-[0.5vw] p-[1.25vw]">
      {isFilter && (
        <DateFilter
          filterChart={filterChart}
          setFilterChart={setFilterChart}
          setIsFilter={setIsFilter}
        />
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.6vw]">
          <Landmark size={18} />

          <h1 className="text-[0.9vw] font-medium opacity-50">
            Net Worth (Cash-based)
          </h1>
        </div>

        <button className="cursor-pointer" onClick={() => setIsFilter(true)}>
          <Funnel />
        </button>
      </div>
      <hr className="text-card border-2" />

      {isPending ? (
        <div className="bg-card animate-pulse rounded-[0.5vw] h-[24.5vw]" />
      ) : (
        <NetWorthChartContent
          sortedData={sortedData}
          isBalanceShown={isBalanceShown}
        />
      )}
    </div>
  );
};

export default Chart;
