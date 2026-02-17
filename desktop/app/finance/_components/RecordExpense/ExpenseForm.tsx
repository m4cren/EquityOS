"use client";

import DropDownSelection from "@/app/_components/DropDownSelection";
import {
  AccountIconTypes,
  expenseCategoryIconMap,
  ExpenseCategoryIconTypes,
  ExpenseTypes,
} from "@/lib/types";
import { useExpenseCategory } from "@/store/ExpenseCategorySlice/useExpenseCategory";
import { useFinanceAccount } from "@/store/financeAccountSlice/useFinanceAccount";
import { Calendar, Coins, Logs, Plus, UserCircle } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { accountIconMapp } from "../Accounts/Accounts";
import ErrorMessage from "@/app/_components/ErrorMessage";
import { useExpense } from "@/store/RecordExpense/useExpense";
import { AsyncThunk, AsyncThunkConfig } from "@reduxjs/toolkit";

interface Props {
  handleClose: () => {
    payload: undefined;
    type: "recordFinance/close";
  };
}
const ExpenseFormStatic = ({ handleClose }: Props) => {
  const { dispatch, recordExpense } = useExpense();

  const { register, handleSubmit } = useForm<ExpenseTypes>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const { accounts } = useFinanceAccount();
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const currentBalance = accounts.find(
    ({ name }) => name === selectedAccount
  )?.balance;
  const newBalance = (currentBalance || 0) - expenseAmount;
  const [selectedCategory, setSelectedCategory] = useState<{
    icon: ExpenseCategoryIconTypes;
    label: string;
    id: string;
  } | null>(null);
  const { expense_category } = useExpenseCategory();
  const categories = expense_category;

  const onSubmit = (data: ExpenseTypes) => {
    setIsSubmitting(true);
    const dateObj = new Date(data.date_str);
    const dateToday = new Date();

    const dateTodayFormatted = dateToday.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    const formFormattedDate = dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    if (!data.label) {
      setErrMsg("Provide a label");
      setIsSubmitting(false);
      return;
    }
    if (selectedAccount && selectedCategory?.icon && selectedCategory.label) {
      dispatch(
        recordExpense({
          ...data,
          date_str: data.date_str ? formFormattedDate : dateTodayFormatted,

          acc_icon:
            accounts.find(({ name }) => name === selectedAccount)?.icon ||
            "wallet",
          acc_id:
            accounts.find(({ name }) => name === selectedAccount)?.id || "",
          category_icon: selectedCategory.icon || "Miscellaneous",
          category: selectedCategory.label,
          category_id: selectedCategory.id,
          account: selectedAccount,
        })
      );
      setTimeout(() => {
        handleClose();
      }, 1500);
    } else {
      setErrMsg("Please select an account/category");
      setTimeout(() => {
        setErrMsg(null);
      }, 5000);
    }
  };
  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setExpenseAmount(Number(e.target.value));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[1vw] w-[22vw]"
    >
      <input
        {...register("label")}
        type="text"
        placeholder="Where did the money go?"
        className="text-[1.5vw] font-semibold outline-none w-full"
      />

      {/* Account */}
      <div className="flex items-center justify-between">
        <label className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]">
          <UserCircle size={20} />
          Account
        </label>
        <DropDownSelection<string | null>
          selectionLabel="Select account"
          type="dropdown"
          selectedItem={selectedAccount}
        >
          <ul className="flex flex-col gap-[0.1vw]">
            {accounts.map(({ icon, name, id }) => {
              const AccountIcon = accountIconMapp[icon as AccountIconTypes];
              return (
                <li
                  key={id}
                  onClick={() => {
                    setSelectedAccount(name);
                  }}
                  className="flex items-center gap-[0.3vw] hover:bg-[#d4d4d420] py-[0.4vw] pl-[0.4vw] rounded-[0.4vw] transition duration-200"
                >
                  <AccountIcon />
                  {name}
                </li>
              );
            })}
          </ul>
        </DropDownSelection>
      </div>

      {/* Category */}
      <div className="flex items-center justify-between">
        <label className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]">
          <Logs size={20} />
          Category
        </label>
        <DropDownSelection<string | undefined>
          selectionLabel="Select category"
          type="dropdown"
          selectedItem={selectedCategory?.label}
        >
          <ul className="flex flex-col gap-[0.1vw]">
            {categories.length > 0 ? (
              categories.map(({ icon, label, id }) => {
                const AccountIcon =
                  expenseCategoryIconMap[icon as ExpenseCategoryIconTypes];
                return (
                  <li
                    key={id}
                    onClick={() => {
                      setSelectedCategory({
                        label: label,
                        icon: icon,
                        id: id!,
                      });
                    }}
                    className="flex items-center gap-[0.3vw] hover:bg-[#d4d4d420] py-[0.4vw] pl-[0.4vw] rounded-[0.4vw] transition duration-200"
                  >
                    <AccountIcon />
                    {label}
                  </li>
                );
              })
            ) : (
              <li className=" text-[0.75vw]">Provide an expense category</li>
            )}
          </ul>
        </DropDownSelection>
      </div>

      {errMsg && <ErrorMessage errMsg={errMsg} />}
      <div className="flex items-center justify-between -mb-[0.8vw]">
        <span className="text-[0.85vw] opacity-50">Current Balance:</span>
        <span className="text-[0.85vw] opacity-50">₱{currentBalance}</span>
      </div>

      {/* Amount */}
      <div className="flex items-center justify-between">
        <label className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]">
          <Coins size={20} />
          Amount
        </label>
        <input
          {...register("amount")}
          type="number"
          min={0}
          onChange={handleChangeAmount}
          max={currentBalance}
          inputMode="numeric"
          autoComplete="off"
          required
          placeholder="₱0"
          className="outline-none text-end w-[6vw] text-[1vw] font-semibold"
        />
      </div>

      <hr className="opacity-20 -mt-[0.6vw]" />

      {/* New Balance */}
      <div className="flex items-center justify-between -mt-[0.8vw]">
        <span className="text-[0.85vw] opacity-50">New Balance:</span>
        <span className="text-[0.85vw] opacity-50">₱{newBalance}</span>
      </div>

      {/* Date */}
      <div className="flex items-center justify-between">
        <label className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]">
          <Calendar size={20} />
          Date
        </label>
        <input
          {...register("date_str")}
          type="date"
          className="outline-none border border-[#d4d4d430] rounded-[0.35vw] px-[1vw] text-[0.9vw] py-[0.25vw]"
        />
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="disabled:opacity-50 disabled:cursor-not-allowed  cursor-pointer text-[0.9vw] py-[0.4vw] bg-[#2c2c2c] rounded-[0.6vw] flex flex-col items-center justify-center"
      >
        {!isSubmitting ? (
          <>
            <Plus />
            Record
          </>
        ) : (
          <p>Submitting</p>
        )}
      </button>
    </form>
  );
};

export default ExpenseFormStatic;
