"use client";

import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  LucideIcon,
  Scale,
  Scroll,
  Text,
} from "lucide-react";
import { accountIconMapp } from "../../_components/Accounts/Accounts";
import { AccountIconTypes } from "@/lib/types";
import { useFinanceAccount } from "@/store/financeAccountSlice/useFinanceAccount";
import TableSkeleton from "./TableSkeleton";

// 🔹 TABLE HEADERS
const tableHeader: { label: string; icon: LucideIcon }[] = [
  { label: "Account Name", icon: Text },
  { label: "Total Balance", icon: Scale },
  { label: "Total Income", icon: BanknoteArrowDown },
  { label: "Total Expense", icon: BanknoteArrowUp },
];

const isBalanceShown = true; // static toggle

const Details = () => {
  const { accounts, is_pending } = useFinanceAccount();
  return (
    <div className="flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
      <div className="flex items-center gap-[0.6vw]">
        <Scroll size={18} />
        <h1 className="text-[0.9vw] font-medium opacity-50">Details</h1>
      </div>

      <hr className="text-card border-2" />

      {is_pending ? (
        <TableSkeleton />
      ) : accounts.length !== 0 ? (
        <table>
          <thead>
            <tr>
              {tableHeader.map(({ icon, label }, index) => {
                const IconComponent = icon;
                return (
                  <th key={index} className="py-[0.6vw] px-[0.5vw]">
                    <span className="flex items-center gap-[0.3vw] text-[0.9vw] font-medium opacity-80">
                      <IconComponent size={15} />
                      {label}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {accounts.map(
              ({ balance, name, total_expense, total_income, id, icon }) => {
                const IconComponent = accountIconMapp[icon as AccountIconTypes];
                return (
                  <tr key={id} className="text-[0.9vw]">
                    <td className="border-t-2 border-b-2 border-card py-[0.5vw] px-[1vw]">
                      <span className="flex items-center gap-[0.4vw]">
                        <IconComponent size={16} />
                        {name}
                      </span>
                    </td>

                    <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                      ₱ {isBalanceShown ? balance.toLocaleString() : "••••"}
                    </td>

                    <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                      ₱{" "}
                      {isBalanceShown ? total_income.toLocaleString() : "••••"}
                    </td>

                    <td className="border-t-2 border-b-2 border-card py-[0.5vw] px-[1vw]">
                      ₱{" "}
                      {isBalanceShown ? total_expense.toLocaleString() : "••••"}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      ) : (
        <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
          No details available
        </p>
      )}
    </div>
  );
};

export default Details;
