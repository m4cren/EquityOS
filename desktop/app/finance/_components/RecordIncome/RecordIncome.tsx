"use client";

import { XIcon } from "lucide-react";
import IncomeForm from "./IncomeForm";
interface Props {
  handleClose: () => {
    payload: undefined;
    type: "recordFinance/close";
  };
}
const RecordIncome = ({ handleClose }: Props) => {
  return (
    <div className=" fixed bg-black/30 z-10 backdrop-blur-[1vw] top-0 left-0 bottom-0 right-0 flex  items-center justify-start">
      <div className="relative recordIncomeToggleAnimation flex flex-col items-end justify-center px-[3vw] pb-[5vw] gap-[1.2vw] w-[35vw] bg-card rounded-r-[2vw] h-screen">
        <button
          className="absolute top-10 right-10 cursor-pointer"
          onClick={handleClose}
        >
          <XIcon size={18} />
        </button>
        <h2 className="text-[2.5vw] font-bold w-[22vw] text-end">
          Record Income
        </h2>
        <IncomeForm />
      </div>
    </div>
  );
};

export default RecordIncome;
