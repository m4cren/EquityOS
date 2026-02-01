"use client";

import classNames from "classnames";
import { Check } from "lucide-react";
import React, { useState } from "react";

const timeFormatOptions = [{ label: "12-hour" }, { label: "24-hour" }] as const;

const Form = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [timeFormat, setTimeFormat] = useState<"12-hour" | "24-hour">(
    "24-hour"
  );

  return (
    <div className="flex flex-col gap-[2vw]">
      {/* THEME */}
      <div className="flex flex-col gap-[0.5vw]">
        <h4 className="text-[1.5vw] font-bold">Theme</h4>
        <p className="text-[0.85vw] font-medium opacity-60">
          Adjust the color of the interface for better visibility.
        </p>

        <ul className="flex items-center gap-[0.5vw]">
          <li
            onClick={() => setTheme("light")}
            className={classNames(
              "cursor-pointer rounded-full w-[3vw] h-[3vw] bg-[#d4d4d4]",
              { "ring-2 ring-flame": theme === "light" }
            )}
          />

          <li
            onClick={() => setTheme("dark")}
            className={classNames(
              "cursor-pointer relative rounded-full w-[3vw] h-[3vw] bg-card border-2 border-flame",
              { "ring-2 ring-flame": theme === "dark" }
            )}
          >
            {theme === "dark" && (
              <span className="absolute bottom-0 right-0 bg-flame p-[0.15vw] rounded-full">
                <Check size={8} />
              </span>
            )}
          </li>
        </ul>
      </div>

      <hr className="text-[#2c2c2c] border-1" />

      {/* TIME FORMAT */}
      <div className="flex flex-col gap-[1vw]">
        <h4 className="text-[1.5vw] font-bold">Time Format</h4>

        <ul className="flex flex-col gap-[0.75vw] text-[0.9vw] font-semibold">
          {timeFormatOptions.map(({ label }) => (
            <li key={label} className="flex items-center gap-[0.6vw]">
              <button
                onClick={() => setTimeFormat(label)}
                className={classNames("rounded-full h-[1.5vw] w-[1.5vw]", {
                  "border-6 border-flame bg-white": timeFormat === label,
                  "border-3 border-[#d4d4d450] bg-transparent":
                    timeFormat !== label,
                })}
              />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;
