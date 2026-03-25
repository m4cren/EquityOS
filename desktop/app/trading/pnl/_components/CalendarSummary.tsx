"use client";

import { Day } from "@/hooks/useCalendar";
import { TradeFormData } from "@/lib/types";
import classNames from "classnames";
import React, { useMemo } from "react";

type TradeItem = TradeFormData & { id: string };

type Props = {
  days: Day[];
  monthLabel: string;
  currentDate: Date;
  trades: TradeItem[];
};

const formatPnL = (value: number) => {
  return `${value > 0 ? "+" : value < 0 ? "-" : ""}${Math.abs(value).toFixed(
    2
  )}`;
};

const formatKey = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CalendarSummary: React.FC<Props> = ({
  days,
  monthLabel,
  currentDate,
  trades,
}) => {
  const { weeklyRows, monthlyNet, monthlyTrades } = useMemo(() => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const currentMonthDays = days.filter(
      (day) =>
        day.date.getMonth() === currentMonth &&
        day.date.getFullYear() === currentYear
    );

    const weekdayDays = currentMonthDays.filter((day) => {
      const weekday = day.date.getDay();
      return weekday >= 1 && weekday <= 5;
    });

    const dailyTradeMap = trades.reduce<
      Record<string, { net: number; trades: number }>
    >((acc, trade) => {
      const dateKey = trade.openTime.split("T")[0];
      const pnl = trade.pnl ?? 0;

      if (!acc[dateKey]) {
        acc[dateKey] = { net: 0, trades: 0 };
      }

      acc[dateKey].net += pnl;
      acc[dateKey].trades += 1;

      return acc;
    }, {});

    const groupedWeeks = new Map<
      string,
      { dates: Date[]; net: number; trades: number }
    >();

    weekdayDays.forEach((day) => {
      const date = day.date;
      const jsDay = date.getDay();
      const diffToMonday = 1 - jsDay;
      const monday = new Date(date);
      monday.setDate(date.getDate() + diffToMonday);

      const key = formatKey(monday);

      if (!groupedWeeks.has(key)) {
        groupedWeeks.set(key, { dates: [], net: 0, trades: 0 });
      }

      const week = groupedWeeks.get(key)!;
      const data = dailyTradeMap[formatKey(date)] ?? { net: 0, trades: 0 };

      week.dates.push(date);
      week.net += data.net;
      week.trades += data.trades;
    });

    const weeklyRows = Array.from(groupedWeeks.values()).map((week) => {
      const sortedDates = [...week.dates].sort(
        (a, b) => a.getTime() - b.getTime()
      );

      const first = sortedDates[0];
      const last = sortedDates[sortedDates.length - 1];

      return {
        range: `${first.toLocaleString("default", {
          month: "short",
        })} ${first.getDate()} - ${last.getDate()}`,
        net: week.net,
        trades: week.trades,
      };
    });

    const monthlyNet = weeklyRows.reduce((sum, week) => sum + week.net, 0);
    const monthlyTrades = weeklyRows.reduce(
      (sum, week) => sum + week.trades,
      0
    );

    return { weeklyRows, monthlyNet, monthlyTrades };
  }, [days, currentDate, trades]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex-1 bg-transparent shadow-md rounded-[0.7vw] p-[1.1vw]">
        <header className="mb-[1.75vw]">
          <h3 className="text-[1.25vw] font-semibold">Weekly Summary</h3>
          <p className="text-[0.9vw] text-white/50 mt-1">{monthLabel}</p>
        </header>

        <div className="flex flex-col gap-2">
          {weeklyRows.map((week) => (
            <div
              key={week.range}
              className="rounded-md border border-card px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.95vw] font-medium">{week.range}</p>
                </div>

                <p
                  className={classNames("text-[0.95vw] font-semibold", {
                    "text-green-400": week.net > 0,
                    "text-red-400": week.net < 0,
                    "text-white": week.net === 0,
                  })}
                >
                  {formatPnL(week.net)}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between text-[0.85vw] text-white/55">
                <span>Total Trades</span>
                <span className="text-white/80">{week.trades}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-transparent shadow-md rounded-[0.7vw] p-[1.1vw]">
        <header className="mb-4">
          <h3 className="text-[1.1vw] font-semibold">Monthly Summary</h3>
          <p className="text-[0.85vw] text-white/50 mt-1">{monthLabel}</p>
        </header>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-[0.9vw]">
            <span className="text-white/55">Accumulated PnL</span>
            <span
              className={classNames("font-semibold", {
                "text-green-400": monthlyNet > 0,
                "text-red-400": monthlyNet < 0,
                "text-white": monthlyNet === 0,
              })}
            >
              {formatPnL(monthlyNet)}
            </span>
          </div>

          <div className="flex items-center justify-between text-[0.9vw]">
            <span className="text-white/55">Total Trades</span>
            <span className="font-semibold text-white/90">{monthlyTrades}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSummary;
