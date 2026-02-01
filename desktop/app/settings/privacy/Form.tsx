"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import InputPinContainer from "./InputPinContainer";
import ErrorMessage from "@/app/_components/ErrorMessage";

interface Props {
  action: "new" | "change";
}

export type PasswordFormType = {
  oldPIN: string;
  newPIN: string;
  confirmPIN?: string;
};

export type PasswordInputType = {
  oldPIN: boolean;
  newPIN: boolean;
  confirmPIN?: boolean;
};

const Form = ({ action }: Props) => {
  const [isPasswordShown, setIsPasswordShown] = useState<PasswordInputType>({
    oldPIN: false,
    newPIN: false,
    confirmPIN: false,
  });

  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const { register, handleSubmit, reset } = useForm<PasswordFormType>();

  const onSubmit = (data: PasswordFormType) => {
    setIsPending(true);

    if (data.newPIN !== data.confirmPIN && action === "change") {
      setErrMsg("PIN do not match");
      setIsPending(false);
      return;
    }

    if (data.newPIN.length <= 5) {
      setErrMsg("PIN should be more than 5 characters");
      setIsPending(false);
      return;
    }

    setTimeout(() => {
      console.log("Demo PIN saved:", data.newPIN);
      reset();
      setIsPending(false);
      setErrMsg(null);
      alert("Demo: PIN updated successfully");
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[1vw]">
      <InputPinContainer
        action={action}
        isPasswordShown={isPasswordShown}
        label="oldPIN"
        register={register}
        setIsPasswordShown={setIsPasswordShown}
      />

      <InputPinContainer
        isPasswordShown={isPasswordShown}
        label="newPIN"
        register={register}
        action={action}
        setIsPasswordShown={setIsPasswordShown}
      />

      {action === "change" && (
        <InputPinContainer
          isPasswordShown={isPasswordShown}
          label="confirmPIN"
          action={action}
          register={register}
          setIsPasswordShown={setIsPasswordShown}
        />
      )}

      {errMsg && (
        <div className="w-[20vw]">
          <ErrorMessage errMsg={errMsg} />
        </div>
      )}

      <button
        type="submit"
        className="bg-flame-secondary cursor-pointer rounded-[0.4vw] px-[1vw] py-[0.3vw] w-[18%] text-[0.9vw] font-semibold mt-[1.5vw]"
      >
        {isPending ? (
          <span className="loading loading-infinity text-center" />
        ) : action === "change" ? (
          "Change PIN"
        ) : (
          "Confirm"
        )}
      </button>
    </form>
  );
};

export default Form;
