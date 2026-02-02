"use client";
import { useRecordFinance } from "@/store/recordFinanceSlice/useRecordFinance";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Landmark,
  LucideIcon,
  Plus,
  Recycle,
  User,
} from "lucide-react";
import React from "react";

interface Props {
  label: string;
  quote?: string;
}

const pageIconMap: Record<string, LucideIcon> = {
  "Finance Tracker": Landmark,
  Accounts: User,
  Income: BanknoteArrowDown,
  Expenses: BanknoteArrowUp,
  Transfer: Recycle,
};

const actionBtn = [
  {
    icon: BanknoteArrowDown,
    label: "Income",
    value: "income",
  },
  {
    icon: BanknoteArrowUp,
    label: "Expense",
    value: "expense",
  },
  {
    icon: Recycle,
    label: "Transfer",
    value: "transfer",
  },
];

const Header = ({ label, quote }: Props) => {
  const IconComponent = pageIconMap[label];
  const {
    handleClose,
    modalOpen,
    handleOpenExpense,
    handleOpenIncome,
    handleOpenTransfer,
  } = useRecordFinance();
  return (
    <div className="flex flex-col gap-[1vw] -mt-[3vw]">
      <IconComponent size={100} />
      <h1 className="text-[2vw] font-bold">{label}</h1>
      {quote && (
        <div className="flex items-center gap-[1.3vw]">
          <div className="bg-[#d4d4d450] w-[0.25vw] h-[3.5vw]"></div>
          <p className="text-[1vw] max-w-[69vw]">
            <i>{quote}</i>
          </p>
          <div className="ml-auto">
            <div className="flex gap-2 items-center text-sm">
              {actionBtn.map(({ icon, label, value }) => {
                const IconComponent = icon;
                return (
                  <button
                    onClick={() =>
                      value === "income"
                        ? handleOpenIncome()
                        : value === "expense"
                        ? handleOpenExpense()
                        : value === "transfer"
                        ? handleOpenTransfer()
                        : () => {}
                    }
                    key={value}
                    className="flex cursor-pointer hover:bg-transparent border-2 border-transparent hover:border-2 hover:border-card transition duration-150 items-center gap-1 bg-card font-semibold px-2 py-1 text-sm rounded-lg "
                  >
                    <IconComponent size={16} /> {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
