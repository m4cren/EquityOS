"use client";

import { usePopupState } from "@/lib/hooks/popup/usePopupState";
import { useEffect } from "react";
import TransferForm from "./TransferForm";

const RecordTransfer = () => {
   const { popup, togglePopup, untogglePopup, dispatch } = usePopupState();

   useEffect(() => {
      const toggleRecordTransfer = (e: KeyboardEvent) => {
         if (e.ctrlKey && e.key.toLocaleLowerCase() === "3") {
            dispatch(togglePopup("recordTransfer"));
         } else if (e.ctrlKey && e.key === ".") {
            dispatch(untogglePopup("recordTransfer"));
         }
      };

      window.addEventListener("keydown", toggleRecordTransfer);

      return () => {
         window.removeEventListener("keydown", toggleRecordTransfer);
      };
   }, [dispatch, togglePopup, untogglePopup]);

   if (popup.recordTransfer) {
      return (
         <div className=" fixed bg-black/30 z-10 backdrop-blur-[1vw] top-0 left-0 bottom-0 right-0 flex  items-center justify-center">
            <div className="menuToggleAnimation flex flex-col items-center justify-center p-[3vw] gap-[1.2vw] w-[35vw] bg-card rounded-[2vw] h-fit">
               <h2 className="text-[2.5vw] font-bold w-[22vw] text-center">
                  Record Transfer
               </h2>
               <TransferForm />
            </div>
         </div>
      );
   }
};

export default RecordTransfer;
