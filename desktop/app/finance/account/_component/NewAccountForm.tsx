import DropDownSelection from "@/app/_components/DropDownSelection";
import { AccountIconTypes, AccountTypes } from "@/lib/types";
import { CheckCircle, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { accountIconMapp } from "../../_components/Accounts/Accounts";
import ErrorMessage from "@/app/_components/ErrorMessage";
import { useFinanceAccount } from "@/store/financeAccountSlice/useFinanceAccount";
import {
  AsyncThunk,
  AsyncThunkConfig,
  Dispatch,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";

export const iconOption: AccountIconTypes[] = [
  "bank",
  "card",
  "savings",
  "wallet",
];

export const capitalFirstLetter = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

interface Props {
  setIsNewAccount: React.Dispatch<React.SetStateAction<boolean>>;
  addFinanceAccount: AsyncThunk<
    AccountTypes[] | undefined,
    AccountTypes,
    AsyncThunkConfig
  >;
  dispatch: ThunkDispatch<
    {
      financeAccount: {
        is_pending: boolean;
        err_msg: string | null;
        accounts: AccountTypes[];
      };
    },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>;
}

const NewAccountForm = ({
  setIsNewAccount,
  addFinanceAccount,
  dispatch,
}: Props) => {
  const { register, handleSubmit } = useForm<AccountTypes>();
  const [selectedIcon, setSelectedIcon] = useState<AccountIconTypes | null>(
    null
  );
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const onSubmit = (data: AccountTypes) => {
    if (!data.name) {
      setErrMsg("Provide a name");
      return;
    }

    if (!selectedIcon) {
      setErrMsg("Select an icon");
      return;
    }

    // Demo only
    console.log("New account (demo):", {
      ...data,
      icon: selectedIcon,
    });
    dispatch(
      addFinanceAccount({
        ...data,
        icon: selectedIcon,
      })
    );
    setIsNewAccount(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-card border-3 p-[0.8vw] rounded-[0.6vw] flex items-center justify-around gap-[0.6vw]"
    >
      <div className="flex flex-col items-start gap-[0.5vw]">
        <input
          type="text"
          autoComplete="off"
          {...register("name")}
          className="text-[1.1vw] font-medium outline-none w-[9vw]"
          placeholder="Account name"
        />

        <DropDownSelection<AccountIconTypes | null>
          selectionLabel="Select icon"
          selectedItem={
            selectedIcon
              ? (capitalFirstLetter(selectedIcon) as AccountIconTypes)
              : null
          }
          type="dropdown"
        >
          <ul className="flex flex-col gap-[0.1vw]">
            {iconOption.map((icon, id) => {
              const AccountIcon = accountIconMapp[icon as AccountIconTypes];
              return (
                <li
                  key={id}
                  onClick={() => setSelectedIcon(icon)}
                  className="flex items-center gap-[0.3vw] hover:bg-[#d4d4d420] py-[0.4vw] pl-[0.4vw] rounded-[0.4vw] transition duration-200 cursor-pointer"
                >
                  <AccountIcon size={14} />
                  {capitalFirstLetter(icon)}
                </li>
              );
            })}
          </ul>
        </DropDownSelection>

        {errMsg && <ErrorMessage errMsg={errMsg} />}
      </div>

      <div className="flex flex-col gap-[0.5vw]">
        <button type="submit" className="cursor-pointer text-green-500/70">
          <CheckCircle size={20} />
        </button>
        <button
          type="button"
          onClick={() => setIsNewAccount(false)}
          className="cursor-pointer opacity-40"
        >
          <XCircleIcon size={20} />
        </button>
      </div>
    </form>
  );
};

export default NewAccountForm;
