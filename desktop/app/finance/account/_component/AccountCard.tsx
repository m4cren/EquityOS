import { AccountIconTypes, AccountTypes } from "@/lib/types";
import { CheckCircle, Pencil, Trash, XIcon } from "lucide-react";
import { useState } from "react";

import { capitalFirstLetter, iconOption } from "./NewAccountForm";
import { useForm } from "react-hook-form";
import { accountIconMapp } from "../../_components/Accounts/Accounts";
import DropDownSelection from "@/app/_components/DropDownSelection";
import ErrorMessage from "@/app/_components/ErrorMessage";
import ConfirmationModal from "@/app/_components/ConfirmationModal";

interface Props {
  account: AccountTypes;
  isBalanceShown: boolean;
  handleDeleteAccount: ({ id, name }: { id: string; name: string }) => void;
  handleEditAccount: (
    id: string,
    newName: string,
    newIcon: AccountIconTypes
  ) => void;
}

const AccountCard = ({
  account,
  isBalanceShown,
  handleDeleteAccount,
  handleEditAccount,
}: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<AccountIconTypes | null>(
    null
  );
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const IconComponent = accountIconMapp[account.icon];
  const { register, handleSubmit } = useForm<AccountTypes>();

  const onSubmit = (data: AccountTypes) => {
    if (!data.name) {
      setErrMsg("Provide account name");
      return;
    }

    if (!selectedIcon) {
      setErrMsg("Select an icon");
      return;
    }
    handleEditAccount(account.id!, data.name!, selectedIcon);
    setIsEditMode(false);
    setErrMsg(null);
  };

  if (!isEditMode) {
    return (
      <li className="bg-card p-[1.3vw] rounded-[0.6vw] flex justify-between items-center">
        <div className="flex flex-col gap-[0.4vw]">
          <div className="flex items-center gap-[0.6vw]">
            <IconComponent size={20} />
            <h3 className="text-[1.1vw] font-bold">{account.name}</h3>
          </div>
          <p className="text-[1vw] opacity-70">
            ₱ {isBalanceShown ? account.balance.toLocaleString() : "••••"}
          </p>
        </div>

        <button onClick={() => setIsEditMode(true)} className="cursor-pointer">
          <Pencil size={18} />
        </button>
      </li>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card p-[1.3vw] rounded-[0.6vw] flex justify-between items-center"
    >
      <div className="flex flex-col gap-[0.4vw]">
        <input
          type="text"
          defaultValue={account.name}
          {...register("name")}
          className="outline-none font-bold w-full"
        />

        <DropDownSelection<AccountIconTypes | null>
          selectionLabel="Select icon"
          type="dropdown"
          selectedItem={
            selectedIcon
              ? (capitalFirstLetter(selectedIcon) as AccountIconTypes)
              : null
          }
        >
          <ul className="flex flex-col gap-[0.1vw]">
            {iconOption.map((icon, idx) => {
              const AccountIcon = accountIconMapp[icon as AccountIconTypes];
              return (
                <li
                  key={idx}
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

      <div className="flex flex-col gap-[0.4vw] items-end">
        <button type="submit" className="cursor-pointer">
          <CheckCircle color="green" size={18} />
        </button>

        <button
          onClick={() => setIsEditMode(false)}
          type="button"
          className="cursor-pointer"
        >
          <XIcon size={18} />
        </button>

        <ConfirmationModal
          action={() =>
            handleDeleteAccount({ id: account.id!, name: account.name })
          }
          label={"Delete account"}
          sub_label={
            <>
              <IconComponent />
              {account.name}
            </>
          }
        >
          <Trash size={15} color="red" />
        </ConfirmationModal>
      </div>
    </form>
  );
};

export default AccountCard;
