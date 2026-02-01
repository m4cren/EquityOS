"use client";

import { Plus, Users } from "lucide-react";
import { useState } from "react";

import AccountCard from "./AccountCard";
import NewAccountForm from "./NewAccountForm";

import { AccountIconTypes, AccountTypes } from "@/lib/types";
import ShowAmountButton from "../../_components/ShowAmountButton";
import { useFinanceAccount } from "@/store/financeAccountSlice/useFinanceAccount";
import { editFinanceAccount } from "@/store/financeAccountSlice/controller";

const Accounts = () => {
  const {
    accounts,
    addFinanceAccount,
    dispatch,
    deleteFinanceAccount,
    is_pending,
  } = useFinanceAccount();

  const [isNewAccount, setIsNewAccount] = useState(false);

  const isBalanceShown = true; // static

  const handleDeleteAccount = ({ id, name }: { id: string; name: string }) => {
    if (name && id) {
      dispatch(deleteFinanceAccount({ id, name }));
    }
  };

  const handleEditAccount = (
    id: string,
    newName: string,
    newIcon: AccountIconTypes
  ) => {
    if (id && newName && newIcon) {
      dispatch(editFinanceAccount({ id, newName, newIcon }));
    }
  };

  return (
    <div className="flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.6vw]">
          <Users size={18} />
          <h1 className="text-[0.9vw] font-medium opacity-50">Accounts</h1>
        </div>
        <ShowAmountButton />
      </div>

      <hr className="text-card border-2" />

      {!is_pending ? (
        <ul className="grid grid-cols-3 gap-[1.2vw]">
          {accounts.map((account) => (
            <AccountCard
              handleEditAccount={handleEditAccount}
              handleDeleteAccount={handleDeleteAccount}
              key={account.id}
              account={account}
              isBalanceShown={isBalanceShown}
            />
          ))}

          {isNewAccount ? (
            <NewAccountForm
              addFinanceAccount={addFinanceAccount}
              dispatch={dispatch}
              setIsNewAccount={setIsNewAccount}
            />
          ) : (
            <li
              onClick={() => setIsNewAccount(true)}
              className="cursor-pointer active:bg-transparent hover:bg-card transition duration-100 border-card border-3 p-[1.3vw] rounded-[0.6vw] flex items-center justify-center gap-[0.4vw]"
            >
              <Plus size={25} opacity={0.3} />
              <h3 className="text-[1.1vw] opacity-30 font-medium">
                New Account
              </h3>
            </li>
          )}
        </ul>
      ) : (
        <ul className="grid grid-cols-3 gap-[1.2vw]">
          <li className="bg-card animate-pulse w-68 h-24 rounded-md"></li>
          <li className="bg-card animate-pulse w-68 h-24 rounded-md"></li>
          <li className="bg-card animate-pulse w-68 h-24 rounded-md"></li>
          <li className="bg-card animate-pulse w-68 h-24 rounded-md"></li>
          <li className="bg-card animate-pulse w-68 h-24 rounded-md"></li>
          <li className="bg-card animate-pulse w-68 h-24 rounded-md"></li>
        </ul>
      )}
    </div>
  );
};

export default Accounts;
