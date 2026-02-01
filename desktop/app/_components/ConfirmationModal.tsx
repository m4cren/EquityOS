"use client";
import { AlertCircle } from "lucide-react";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  label: string;
  sub_label?: ReactNode;

  action: () => void;
}

const ConfirmationModal = ({ children, action, label, sub_label }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        className="cursor-pointer opacity-40 mt-[0.4vw]"
        onClick={() => setIsActive(true)}
      >
        {children}
      </button>
      {isActive && (
        <div className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 z-10 bg-black/40 backdrop-blur-[4vw]">
          <div className="menuToggleAnimation flex flex-col items-center gap-[2vw] bg-card rounded-[0.8vw] w-fit h-fit p-[3vw]">
            <AlertCircle size={50} className="text-flame/60" />
            <div className="flex items-center flex-col gap-[1vw]">
              <h4 className="text-center text-[1.5vw] flex items-center">
                {label}
              </h4>
              <div className="bg-[#2c2c2c] w-fit px-[1vw] py-[0.3vw] rounded-[1vw] flex items-center text-[1vw] gap-[0.4vw]">
                {sub_label}
              </div>
            </div>
            <div className="flex items-center justify-center gap-[0.6vw] font-semibold text-[1.1vw]">
              <button
                type="button"
                onClick={() => setIsActive(false)}
                className="border-1 border-flame/60 text-flame rounded-full px-[1vw] py-[0.2vw] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  action();
                  setIsActive(false);
                }}
                className=" font-bold border-1 border-flame/60 text-shadow-md cursor-pointer bg-flame/60 rounded-full px-[2vw] py-[0.2vw]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
