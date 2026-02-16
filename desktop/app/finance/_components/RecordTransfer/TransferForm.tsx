"use client";

import DropDownSelection from "@/app/_components/DropDownSelection";
import { AccountIconTypes, TransferTypes } from "@/lib/types";
import { useFinanceAccount } from "@/store/financeAccountSlice/useFinanceAccount";
import { Calendar, Plus, Send, Wallet } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { accountIconMapp } from "../Accounts/Accounts";
import ErrorMessage from "@/app/_components/ErrorMessage";
import { useTransfer } from "@/store/RecordTransfer/useTransfer";

const TransferFormStatic = () => {
  const { register, handleSubmit } = useForm<TransferTypes>();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const { accounts } = useFinanceAccount();

  const { dispatch, recordTransfer } = useTransfer();

  const onSubmit = (data: TransferTypes) => {
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
    if (selectedAccount.from_acc && selectedAccount.to_acc) {
      dispatch(
        recordTransfer({
          ...data,
          date_str: data.date_str ? formFormattedDate : dateTodayFormatted,
          created_at: data.date_str ? dateObj : dateToday,
          from_acc_icon:
            accounts.find(({ name }) => name === selectedAccount.from_acc)
              ?.icon || "wallet",
          to_acc_icon:
            accounts.find(({ name }) => name === selectedAccount.to_acc)
              ?.icon || "wallet",
          from_acc: selectedAccount.from_acc,
          to_acc: selectedAccount.to_acc,
        })
      );
    } else {
      setErrMsg("Select an account");
      setTimeout(() => {
        setErrMsg(null);
      }, 4000);
    }
  };
  const [amountInput, setAmountInput] = useState<number>(0);
  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAmountInput(value);
  };

  const [selectedAccount, setSelectedAccount] = useState<{
    from_acc: string;
    to_acc: string;
  }>({ from_acc: "", to_acc: "" });

  const fromAccBalance = selectedAccount?.from_acc
    ? accounts.find(({ name }) => name === selectedAccount.from_acc)?.balance
    : 0;

  const toAccBalance = selectedAccount?.to_acc
    ? accounts.find(({ name }) => name === selectedAccount.to_acc)?.balance
    : 0;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[1.5vw] w-[28vw]"
    >
      {/* Amount */}
      <input
        type="number"
        {...register("amount")}
        onChange={handleChangeAmount}
        autoComplete="off"
        min={0}
        max={fromAccBalance}
        className="text-[1.5vw] font-semibold outline-none w-full"
        placeholder="Amount to transfer ₱0"
      />

      {/* From Account */}
      <div className="flex items-center justify-between">
        <label className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]">
          <Send size={20} />
          From Account
        </label>
        <DropDownSelection<string>
          selectionLabel="Select from account"
          selectedItem={selectedAccount?.from_acc}
          type="dropdown"
        >
          <ul className="flex flex-col gap-[0.1vw]">
            {accounts
              .filter(({ name }) => name !== selectedAccount.to_acc)
              .map(({ icon, name, id }) => {
                const AccountIcon = accountIconMapp[icon as AccountIconTypes];
                return (
                  <li
                    key={id}
                    onClick={() => {
                      setSelectedAccount({
                        ...selectedAccount,
                        from_acc: name,
                      });
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

      <div className="flex items-center justify-between -mt-[1vw]">
        <span className="text-[0.85vw] opacity-50">Current Balance:</span>
        <p className="text-[0.85vw] opacity-50">
          ₱{fromAccBalance?.toLocaleString()}
        </p>
      </div>

      <hr className="opacity-20 -mt-[1vw]" />

      <div className="flex items-center justify-between -mt-[1vw]">
        <span className="text-[0.85vw] opacity-50">New Balance:</span>
        <p className="text-[0.85vw] opacity-50">
          {selectedAccount.from_acc
            ? `₱ ${(fromAccBalance! - amountInput).toLocaleString()}`
            : "Select from account"}
        </p>
      </div>

      {/* To Account */}
      <div className="flex items-center justify-between">
        <label className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]">
          <Wallet size={20} />
          To Account
        </label>
        <DropDownSelection<string>
          selectionLabel="Select to account"
          type="dropdown"
          selectedItem={selectedAccount?.to_acc}
        >
          <ul className="flex flex-col gap-[0.1vw]">
            {accounts
              .filter(({ name }) => name !== selectedAccount.from_acc)
              .map(({ icon, name, id }) => {
                const AccountIcon = accountIconMapp[icon as AccountIconTypes];
                return (
                  <li
                    key={id}
                    onClick={() => {
                      setSelectedAccount({
                        ...selectedAccount,
                        to_acc: name,
                      });
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

      <div className="flex items-center justify-between -mt-[1vw]">
        <span className="text-[0.85vw] opacity-50">Current Balance:</span>
        <p className="text-[0.85vw] opacity-50">
          ₱{toAccBalance?.toLocaleString()}
        </p>
      </div>

      <hr className="opacity-20 -mt-[1vw]" />

      <div className="flex items-center justify-between -mt-[1vw]">
        <span className="text-[0.85vw] opacity-50">New Balance:</span>
        <p className="text-[0.85vw] opacity-50">
          {selectedAccount.to_acc
            ? `₱ ${(toAccBalance! + amountInput).toLocaleString()}`
            : "Select to account"}
        </p>
      </div>

      {errMsg && <ErrorMessage errMsg={errMsg} />}
      <div className="flex items-center justify-between">
        <label className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]">
          <Calendar size={20} />
          Date
        </label>
        <input
          {...register("date_str")}
          type="date"
          id="date"
          className="outline-none border border-[#d4d4d430] rounded-[0.35vw] px-[1vw] text-[0.9vw] py-[0.25vw]"
        />
      </div>

      <button
        type="submit"
        className="cursor-pointer text-[0.9vw] py-[0.4vw] bg-[#2c2c2c] rounded-[0.6vw] flex flex-col items-center justify-center "
      >
        <Plus />
        Record
      </button>
    </form>
  );
};

export default TransferFormStatic;
