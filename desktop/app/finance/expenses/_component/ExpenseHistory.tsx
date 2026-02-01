"use client";

import { ExpenseTypes } from "@/lib/types";
import { Scroll } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Table from "./Table";
import Pagination from "@/app/_components/Pagination";

// 🔹 STATIC DUMMY EXPENSE
const dummyExpense = [
  {
    id: "1",
    account: "Cash",
    acc_icon: "wallet",
    label: "Lunch",
    amount: 250,
    category: "Food",
    category_icon: "Food",
    date_str: "Jan 05 2024",
    created_at: new Date(),
  },
  {
    id: "2",
    account: "Cash",
    acc_icon: "wallet",
    label: "Bus Fare",
    amount: 80,
    category: "Transportation",
    category_icon: "Transportation",
    date_str: "Jan 06 2024",
    created_at: new Date(),
  },
  {
    id: "3",
    account: "Savings",
    acc_icon: "bank",
    label: "Internet Bill",
    amount: 1500,
    category: "Internet",
    category_icon: "Internet",
    date_str: "Jan 08 2024",
    created_at: new Date(),
  },
  {
    id: "4",
    account: "Credit",
    acc_icon: "card",
    label: "Groceries",
    amount: 2200,
    category: "Groceries",
    category_icon: "Groceries",
    date_str: "Jan 10 2024",
    created_at: new Date(),
  },
  {
    id: "5",
    account: "Cash",
    acc_icon: "wallet",
    label: "Movie",
    amount: 500,
    category: "Entertainment",
    category_icon: "Entertainment",
    date_str: "Jan 12 2024",
    created_at: new Date(),
  },
  {
    id: "6",
    account: "Savings",
    acc_icon: "bank",
    label: "Gym Membership",
    amount: 1200,
    category: "Gym",
    category_icon: "Gym",
    date_str: "Jan 15 2024",
    created_at: new Date(),
  },
] satisfies ExpenseTypes[];

const PAGE_SIZE = 5;

const ExpenseHistory = () => {
  const searchParams = useSearchParams();
  const pageName = "expense_history_page";
  const currentPage = Number(searchParams.get(pageName)) || 1;

  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedExpense = dummyExpense.slice(start, start + PAGE_SIZE);

  return (
    <div className="relative flex flex-col gap-[1vw] w-full min-h-[24vw] h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
      <div className="flex items-center gap-[0.6vw]">
        <Scroll size={18} />
        <h1 className="text-[0.9vw] font-medium opacity-50">Expense History</h1>
      </div>

      <hr className="text-card border-2" />

      {dummyExpense.length !== 0 ? (
        <>
          <Table items={paginatedExpense} />
          <div className="absolute top-[90%] left-1/2 -translate-y-1/2 -translate-x-1/2">
            <Pagination
              currentPage={currentPage}
              items={dummyExpense.length}
              name={pageName}
            />
          </div>
        </>
      ) : (
        <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
          You have no expense history
        </p>
      )}
    </div>
  );
};

export default ExpenseHistory;
