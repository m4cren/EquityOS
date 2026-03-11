"use client";

import { Day } from "@/hooks/useCalendar";
import classNames from "classnames";
import React, { useMemo } from "react";

type Props = {
  days: Day[];
  monthLabel: string;
  currentDate: Date;
};

type TradeDayData = {
  net: number;
  trades: number;
};

const formatMoney = (value: number) => {
  return `${value > 0 ? "+" : value < 0 ? "-" : ""}$${Math.abs(value)}`;
};

const DAILY_DATA: Record<string, TradeDayData> = {
  // JAN 2026
  "2026-01-01": { net: 120, trades: 2 },
  "2026-01-02": { net: -40, trades: 1 },
  "2026-01-05": { net: 180, trades: 3 },
  "2026-01-06": { net: 75, trades: 2 },
  "2026-01-07": { net: -90, trades: 2 },
  "2026-01-08": { net: 140, trades: 3 },
  "2026-01-09": { net: 60, trades: 1 },
  "2026-01-12": { net: -30, trades: 1 },
  "2026-01-13": { net: 220, trades: 4 },
  "2026-01-14": { net: 95, trades: 2 },
  "2026-01-15": { net: -110, trades: 2 },
  "2026-01-16": { net: 170, trades: 3 },
  "2026-01-19": { net: 80, trades: 2 },
  "2026-01-20": { net: -55, trades: 1 },
  "2026-01-21": { net: 130, trades: 2 },
  "2026-01-22": { net: 210, trades: 3 },
  "2026-01-23": { net: -70, trades: 2 },
  "2026-01-26": { net: 90, trades: 2 },
  "2026-01-27": { net: 160, trades: 3 },
  "2026-01-28": { net: -35, trades: 1 },
  "2026-01-29": { net: 110, trades: 2 },
  "2026-01-30": { net: 250, trades: 4 },

  // FEB 2026
  "2026-02-02": { net: 140, trades: 2 },
  "2026-02-03": { net: -65, trades: 1 },
  "2026-02-04": { net: 200, trades: 3 },
  "2026-02-05": { net: 85, trades: 2 },
  "2026-02-06": { net: -120, trades: 2 },
  "2026-02-09": { net: 60, trades: 1 },
  "2026-02-10": { net: 175, trades: 3 },
  "2026-02-11": { net: -45, trades: 1 },
  "2026-02-12": { net: 130, trades: 2 },
  "2026-02-13": { net: 95, trades: 2 },
  "2026-02-16": { net: -80, trades: 2 },
  "2026-02-17": { net: 210, trades: 4 },
  "2026-02-18": { net: 70, trades: 2 },
  "2026-02-19": { net: -25, trades: 1 },
  "2026-02-20": { net: 180, trades: 3 },
  "2026-02-23": { net: 115, trades: 2 },
  "2026-02-24": { net: -90, trades: 2 },
  "2026-02-25": { net: 145, trades: 3 },
  "2026-02-26": { net: 55, trades: 1 },
  "2026-02-27": { net: 220, trades: 4 },

  // MAR 2026
  "2026-03-02": { net: 125, trades: 2 },
  "2026-03-03": { net: -50, trades: 1 },
  "2026-03-04": { net: 240, trades: 4 },
  "2026-03-05": { net: 90, trades: 2 },
  "2026-03-06": { net: -130, trades: 2 },
  "2026-03-09": { net: 75, trades: 1 },
  "2026-03-10": { net: 160, trades: 3 },
  "2026-03-11": { net: -40, trades: 1 },
  "2026-03-12": { net: 185, trades: 3 },
  "2026-03-13": { net: 110, trades: 2 },
  "2026-03-16": { net: -95, trades: 2 },
  "2026-03-17": { net: 230, trades: 4 },
  "2026-03-18": { net: 60, trades: 1 },
  "2026-03-19": { net: -35, trades: 1 },
  "2026-03-20": { net: 205, trades: 3 },
  "2026-03-23": { net: 100, trades: 2 },
  "2026-03-24": { net: -70, trades: 2 },
  "2026-03-25": { net: 150, trades: 3 },
  "2026-03-26": { net: 80, trades: 2 },
  "2026-03-27": { net: 260, trades: 4 },
  "2026-03-30": { net: -20, trades: 1 },
  "2026-03-31": { net: 140, trades: 2 },
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
      const data = DAILY_DATA[formatKey(date)] ?? { net: 0, trades: 0 };

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
  }, [days, currentDate]);

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
                  {formatMoney(week.net)}
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
            <span className="text-white/55">Net PnL</span>
            <span
              className={classNames("font-semibold", {
                "text-green-400": monthlyNet > 0,
                "text-red-400": monthlyNet < 0,
                "text-white": monthlyNet === 0,
              })}
            >
              {formatMoney(monthlyNet)}
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
