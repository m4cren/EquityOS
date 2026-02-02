"use client";

import { XIcon } from "lucide-react";
import TransferForm from "./TransferForm";
interface Props {
  handleClose: () => {
    payload: undefined;
    type: "recordFinance/close";
  };
}
const RecordTransfer = ({ handleClose }: Props) => {
  return (
    <div className=" fixed bg-black/30 z-10 backdrop-blur-[1vw] top-0 left-0 bottom-0 right-0 flex  items-center justify-center">
      <div className="relative menuToggleAnimation flex flex-col items-center justify-center p-[3vw] gap-[1.2vw] w-[35vw] bg-card rounded-[2vw] h-fit">
        <button
          className="absolute top-7 right-7 cursor-pointer"
          onClick={handleClose}
        >
          <XIcon size={18} />
        </button>
        <h2 className="text-[2.5vw] font-bold w-[22vw] text-center">
          Record Transfer
        </h2>
        <TransferForm />
      </div>
    </div>
  );
};

export default RecordTransfer;
