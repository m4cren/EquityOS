"use client";

import { HandCoins } from "lucide-react";
import BudgetCard from "./BudgetCard";

import { memo } from "react";
import { ExpenseCategoryIconTypes } from "@/lib/types";
import CardSkeleton from "../CardSkeleton";

type CategorySummary = [totalSpent: number, allocatedAmount: number];

type BudgetAllocation = {
  category: string;
  icon: ExpenseCategoryIconTypes;
  categorySummary: CategorySummary;
};

// 🔹 STATIC DUMMY MONTHLY BUDGET
const mergedBudget: BudgetAllocation[] = [
  {
    category: "Food",
    icon: "Food",
    categorySummary: [3200, 5000],
  },
  {
    category: "Transport",
    icon: "Transportation",
    categorySummary: [1800, 3000],
  },
  {
    category: "Bills",
    icon: "Subscription",
    categorySummary: [4500, 6000],
  },
  {
    category: "Entertainment",
    icon: "Loans",
    categorySummary: [1200, 2500],
  },
  {
    category: "Savings",
    icon: "Childcare",
    categorySummary: [2000, 4000],
  },
  {
    category: "Shopping",
    icon: "Utilities",
    categorySummary: [2600, 3500],
  },
];

const MonthlyBudget = () => {
  const isPending = false; // static loading flag

  return (
    <div className="flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
      <div className="flex items-center gap-[0.6vw]">
        <HandCoins size={18} />
        <h1 className="text-[0.9vw] font-medium opacity-50">Monthly Budget</h1>
      </div>

      <hr className="text-card border-2" />

      {isPending ? (
        <CardSkeleton />
      ) : mergedBudget.length !== 0 ? (
        <ul className="grid grid-cols-3 gap-[1.2vw]">
          {mergedBudget.map(({ category, categorySummary, icon }, key) => (
            <BudgetCard
              key={key}
              category={category}
              icon={icon}
              amount={categorySummary[0]}
              allocation={categorySummary[1]}
            />
          ))}
        </ul>
      ) : (
        <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
          You have no expense history
        </p>
      )}
    </div>
  );
};

export default memo(MonthlyBudget);
