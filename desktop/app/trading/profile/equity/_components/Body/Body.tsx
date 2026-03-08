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
    <div className="w-full">
      <div className="w-[85%] h-100">
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
