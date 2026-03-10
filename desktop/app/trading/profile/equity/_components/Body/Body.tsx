"use client";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const sortedData = [
  { date_str: "Mar 1", balance: 98000 },
  { date_str: "Mar 2", balance: 99200 },
  { date_str: "Mar 3", balance: 100150 },
  { date_str: "Mar 4", balance: 100050 },
  { date_str: "Mar 5", balance: 100600 },
  { date_str: "Mar 6", balance: 100300 },
  { date_str: "Mar 7", balance: 100932 },
];
const Body = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <h5 className="text-xl  font-semibold">Charts</h5>
      <ul className="border flex w-fit p-2 text-xs font-semibold gap-2 border-card rounded-md">
        <li className="px-3 cursor-pointer bg-card py-1 rounded-sm">Equity</li>
        <li className="px-3 cursor-pointer py-1 rounded-sm">Net Profit</li>
      </ul>
      <div className="w-full h-100">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sortedData} layout="horizontal">
            <CartesianGrid vertical={false} opacity={0.1} />
            <XAxis dataKey="date_str" />
            <YAxis />

            <Line type="monotone" dataKey="balance" stroke="#d4d4d4" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div></div>
    </div>
  );
};

export default Body;
