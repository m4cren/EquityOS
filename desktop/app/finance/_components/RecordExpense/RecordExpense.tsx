"use client";

import { XIcon } from "lucide-react";
import ExpenseForm from "./ExpenseForm";

interface Props {
  handleClose: () => {
    payload: undefined;
    type: "recordFinance/close";
  };
}
const RecordExpense = ({ handleClose }: Props) => {
  return (
    <div className=" fixed bg-black/30 z-10 backdrop-blur-[1vw] top-0 left-0 bottom-0 right-0 flex  items-center justify-end">
      <div className="relative recordExpenseToggleAnimation flex flex-col justify-center px-[3vw] pb-[5vw] gap-[1.2vw] w-[35vw] bg-card rounded-l-[2vw] h-screen">
        <button
          className="absolute top-10 left-10 cursor-pointer"
          onClick={handleClose}
        >
          <XIcon size={18} />
        </button>
        <h2 className="text-[2.5vw] font-bold">Record Expense</h2>
        <ExpenseForm />
      </div>
    </div>
  );
};

export default RecordExpense;
