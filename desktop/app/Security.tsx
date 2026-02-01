"use client";

import { useSecurity } from "@/hooks/useSecurity";
import { Lock } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { api } from "./service/api-client";

const Security = ({ children }: PropsWithChildren) => {
  const isExist = useSecurity();

  return (
    <div className="w-full">
      {/* <SecurityOverlay pin_mode={!isExist ? "NEW" : "SESSION_CHECK"} /> */}
      {children}
    </div>
  );
};

export default Security;

const SecurityOverlay = ({
  pin_mode,
}: {
  pin_mode: "NEW" | "CHANGING" | "SESSION_CHECK";
}) => {
  const [pin, setPin] = useState<string>();
  const createNewPin = async () => {
    if (pin_mode !== "NEW") return;

    if (!pin) return;
    try {
      const data = await api({
        endpoint: "/security/new-pin",
        method: "POST",
        body: { pin: pin },
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="fixed bg-black/30 z-9 backdrop-blur-[1.6vw] top-0 left-0 bottom-0 right-0 flex flex-col  items-center justify-around">
      <div className="flex flex-col items-center justify-center gap-[0.4vw]">
        <Lock size={200} />
        <p className="text-[2vw] font-semibold">
          {pin_mode === "NEW" && "Create Strong PIN"}
        </p>
      </div>
      <ul className="flex flex-col items-center gap-[2vw]">
        <input
          onChange={(e) => setPin(e.target.value)}
          type="password"
          inputMode="numeric"
          autoComplete="off"
          className="outline-none text-center tracking-wide ring-0 appearance-none bg-transparent border-[#d4d4d450] border-1 w-[15vw] py-[0.2vw] px-[1vw] rounded-[0.5vw]"
        />
      </ul>
      <p className="text-[1vw] opacity-60 menuToggleAnimation">Enter PIN</p>
      <button
        onClick={createNewPin}
        className="bg-white/10 px-2 py-1 rounded-md cursor-pointer"
      >
        SAVE
      </button>
    </div>
  );
};
