"use client";
import { useState, useMemo } from "react";

export type Day = { date: Date; isCurrentMonth: boolean; isToday: boolean };

export default function useCalendar(): {
  days: Day[];
  monthLabel: string;
  prevMonth: () => void;
  nextMonth: () => void;
} {
  const [current, setCurrent] = useState(() => new Date());

  const days = useMemo(() => {
    const year = current.getFullYear();
    const month = current.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekday = firstDay.getDay();
    const totalDays = lastDay.getDate();
    const arr: Day[] = [];

    // filler days before
    for (let i = 0; i < startWeekday; i++) {
      const d = new Date(year, month, i - startWeekday + 1);
      arr.push({ date: d, isCurrentMonth: false, isToday: false });
    }

    // current month days
    for (let d = 1; d <= totalDays; d++) {
      const dt = new Date(year, month, d);
      const isToday = dt.toDateString() === new Date().toDateString();
      arr.push({ date: dt, isCurrentMonth: true, isToday });
    }

    // filler after to complete weeks
    while (arr.length % 7 !== 0) {
      const nextDate = new Date(year, month, totalDays + (arr.length % 7));
      arr.push({ date: nextDate, isCurrentMonth: false, isToday: false });
    }

    return arr;
  }, [current]);

  const monthLabel = useMemo(
    () => current.toLocaleString("default", { month: "long", year: "numeric" }),
    [current]
  );

  const prevMonth = () =>
    setCurrent((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const nextMonth = () =>
    setCurrent((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  return { days, monthLabel, prevMonth, nextMonth };
}
