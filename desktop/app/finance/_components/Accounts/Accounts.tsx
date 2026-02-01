"use client";

import { AccountIconTypes } from "@/lib/types";
import {
  CreditCard,
  Landmark,
  LucideIcon,
  PiggyBank,
  Users,
  Wallet,
} from "lucide-react";
import SkeletonCard from "./SkeletonCard";
import ShowAmountButton from "../ShowAmountButton";
import { useFinanceAccount } from "@/store/financeAccountSlice/useFinanceAccount";

export const accountIconMapp: Record<AccountIconTypes, LucideIcon> = {
  wallet: Wallet,
  card: CreditCard,
  bank: Landmark,
  savings: PiggyBank,
};

const isBalanceShown = true; // static toggle

const Accounts = () => {
  const { accounts, is_pending } = useFinanceAccount();
  return (
    <div className="flex flex-col gap-[1vw] w-[20vw] h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.6vw]">
          <Users size={18} />
          <h1 className="text-[0.9vw] font-medium opacity-50">Accounts</h1>
        </div>
        <ShowAmountButton />
      </div>

      <hr className="text-card border-2" />

      {is_pending ? (
        <SkeletonCard />
      ) : accounts.length !== 0 ? (
        <ul className="flex flex-col gap-[0.6vw]">
          {accounts.map(({ balance, icon, name, id }) => {
            const IconComponent = accountIconMapp[icon];

            return (
              <li
                key={id}
                className="flex flex-col gap-[0.4vw] bg-card rounded-[0.6vw] p-[1vw]"
              >
                <div className="flex items-center gap-[0.4vw]">
                  <IconComponent size={18} />
                  <h4 className="text-[1vw] font-bold">{name}</h4>
                </div>

                <h3 className="text-[1vw] opacity-80 font-light">
                  ₱ {isBalanceShown ? balance.toLocaleString() : "••••"}
                </h3>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
          You have no account
        </p>
      )}
    </div>
  );
};

export default Accounts;
