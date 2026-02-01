"use client";

import { IncomeTypes } from "@/lib/types";
import { Scroll } from "lucide-react";
import { useState } from "react";
import Table from "./Table";
import ShowAmountButton from "../../_components/ShowAmountButton";
import Pagination from "@/app/_components/Pagination";

const dummyIncome = [
  {
    id: "1",
    income_stream: "Salary",
    amount: 25000,
    received_in: "Cash",
    acc_icon: "wallet",
    date_str: "Jan 10 2024",
    created_at: new Date(),
    income_type: "Active",
  },
  {
    id: "2",
    income_stream: "Business Profit",
    amount: 8000,
    received_in: "Bank",
    acc_icon: "bank",
    date_str: "Jan 20 2024",
    created_at: new Date(),
    income_type: "Business",
  },
  {
    id: "3",
    income_stream: "Business Bonus",
    amount: 5000,
    received_in: "Bank",
    acc_icon: "bank",
    date_str: "Feb 01 2024",
    created_at: new Date(),
    income_type: "Business",
  },
  {
    id: "4",
    income_stream: "Side Hustle",
    amount: 3500,
    received_in: "Cash",
    acc_icon: "wallet",
    date_str: "Feb 15 2024",
    created_at: new Date(),
    income_type: "Active",
  },
  {
    id: "5",
    income_stream: "Salary",
    amount: 25000,
    received_in: "Bank",
    acc_icon: "bank",
    date_str: "Mar 10 2024",
    created_at: new Date(),
    income_type: "Active",
  },
  {
    id: "6",
    income_stream: "Dividends",
    amount: 4200,
    received_in: "Bank",
    acc_icon: "bank",
    date_str: "Mar 25 2024",
    created_at: new Date(),
    income_type: "Portfolio",
  },
  {
    id: "7",
    income_stream: "Freelance",
    amount: 9000,
    received_in: "Cash",
    acc_icon: "wallet",
    date_str: "Apr 02 2024",
    created_at: new Date(),
    income_type: "Active",
  },
  {
    id: "8",
    income_stream: "Salary",
    amount: 25000,
    received_in: "Bank",
    acc_icon: "bank",
    date_str: "Apr 10 2024",
    created_at: new Date(),
    income_type: "Active",
  },
] satisfies IncomeTypes[];

const PAGE_SIZE = 5;

const IncomeHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedIncome = dummyIncome.slice(start, start + PAGE_SIZE);

  return (
    <div className="relative min-h-[24vw] flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.6vw]">
          <Scroll size={18} />
          <h1 className="text-[0.9vw] font-medium opacity-50">
            Income History Table
          </h1>
        </div>
        <ShowAmountButton />
      </div>

      <hr className="text-card border-2" />

      {dummyIncome.length !== 0 ? (
        <>
          <Table sortedByDate={paginatedIncome} />
          <div className="absolute top-[90%] left-1/2 -translate-y-1/2 -translate-x-1/2">
            <Pagination
              name="income_history_page"
              currentPage={currentPage}
              items={dummyIncome.length}
            />
          </div>
        </>
      ) : (
        <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
          No earnings tracked
        </p>
      )}
    </div>
  );
};

export default IncomeHistory;
