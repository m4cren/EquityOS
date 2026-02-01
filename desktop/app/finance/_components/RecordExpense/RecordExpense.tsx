"use client";

import { usePopupState } from "@/lib/hooks/popup/usePopupState";
import { useEffect } from "react";
import ExpenseForm from "./ExpenseForm";

const RecordExpense = () => {
   const { popup, togglePopup, untogglePopup, dispatch } = usePopupState();

   useEffect(() => {
      const toggleRecordExpense = (e: KeyboardEvent) => {
         if (e.ctrlKey && e.key.toLocaleLowerCase() === "1") {
            dispatch(togglePopup("recordExpense"));
         } else if (e.ctrlKey && e.key === ".") {
            dispatch(untogglePopup("recordExpense"));
         }
      };

      window.addEventListener("keydown", toggleRecordExpense);

      return () => {
         window.removeEventListener("keydown", toggleRecordExpense);
      };
   }, [dispatch, togglePopup, untogglePopup]);

   if (popup.recordExpense) {
      return (
         <div className=" fixed bg-black/30 z-10 backdrop-blur-[1vw] top-0 left-0 bottom-0 right-0 flex  items-center justify-end">
            <div className="recordExpenseToggleAnimation flex flex-col justify-center px-[3vw] pb-[5vw] gap-[1.2vw] w-[35vw] bg-card rounded-l-[2vw] h-screen">
               <h2 className="text-[2.5vw] font-bold">Record Expense</h2>
               <ExpenseForm />
            </div>
         </div>
      );
   }
};

export default RecordExpense;
