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
interface Props {
  handleClose: () => {
    payload: undefined;
    type: "recordFinance/close";
  };
}
const TransferFormStatic = ({ handleClose }: Props) => {
  const { register, handleSubmit } = useForm<TransferTypes>();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const { accounts } = useFinanceAccount();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { dispatch, recordTransfer } = useTransfer();

  const onSubmit = async (data: TransferTypes) => {
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
      setIsSubmitting(true);
      await dispatch(
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
          from_acc_id:
            accounts.find(({ name }) => name === selectedAccount.from_acc)
              ?.id || "",
          to_acc_id:
            accounts.find(({ name }) => name === selectedAccount.to_acc)?.id ||
            "",
        })
      );
      setIsSubmitting(false);
      handleClose();
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
        disabled={isSubmitting}
        type="submit"
        className="
    relative
    flex items-center justify-center gap-2
    px-4 py-2
    rounded-xl
    bg-neutral-900
    text-white
    text-sm font-medium
    transition-all duration-200
    hover:bg-neutral-800
    active:scale-[0.98]
    disabled:opacity-60
    disabled:cursor-not-allowed cursor-pointer
  "
      >
        {!isSubmitting ? (
          <>
            <Plus size={18} />
            <span className="">Record</span>
          </>
        ) : (
          <>
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span>Recording...</span>
          </>
        )}
      </button>
    </form>
  );
};

export default TransferFormStatic;
