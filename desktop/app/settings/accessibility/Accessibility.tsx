"use client";

import DropDownSelection from "@/app/_components/DropDownSelection";
import { capitalFirstLetter } from "@/app/finance/account/_component/NewAccountForm";
import classNames from "classnames";
import React, { useState } from "react";

const animationOptions = ["on", "off"] as const;

const Accessibility = () => {
  const [selectedFont, setSelectedFont] = useState<string | null>("Inter");
  const [animation, setAnimation] = useState<"on" | "off">("on");

  return (
    <div className="flex flex-col gap-[2vw]">
      <div className="flex flex-col gap-[0.5vw]">
        <h4 className="text-[1.5vw] font-bold">Font</h4>
        <p className="text-[0.85vw] font-medium opacity-60">
          Adjust the font of the interface for better readability.
        </p>

        <DropDownSelection
          selectionLabel="Select Font"
          type="dropdown"
          selectedItem={selectedFont}
        >
          <ul className="flex flex-col gap-[0.3vw]">
            <li
              className="cursor-pointer hover:opacity-70"
              onClick={() => setSelectedFont("Inter")}
            >
              Inter
            </li>
            <li
              className="cursor-pointer hover:opacity-70"
              onClick={() => setSelectedFont("Space Grotesk")}
            >
              Space Grotesk
            </li>
          </ul>
        </DropDownSelection>
      </div>

      <hr className="text-[#2c2c2c] border-1" />

      <div className="flex flex-col gap-[1vw]">
        <h4 className="text-[1.5vw] font-bold">Animations</h4>

        <ul className="flex gap-[1vw] text-[0.9vw] font-semibold">
          {animationOptions.map((item) => (
            <li key={item} className="flex items-center gap-[0.6vw]">
              <button
                onClick={() => setAnimation(item)}
                className={classNames(
                  "rounded-full h-[1.5vw] w-[1.5vw] border-3 border-[#d4d4d450] bg-transparent",
                  {
                    "border-6 border-flame bg-white!": animation === item,
                  }
                )}
              />
              {capitalFirstLetter(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Accessibility;
