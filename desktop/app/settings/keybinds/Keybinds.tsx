"use client";

import React from "react";

const keybindConfig = [
  { action: "Menu", keys: ["ctrl", "m"] },
  { action: "Toggle close", keys: ["ctrl", "k"] },
  { action: "Record Expense", keys: ["ctrl", "e"] },
  { action: "Record Income", keys: ["ctrl", "i"] },
  { action: "Record Transfer", keys: ["ctrl", "t"] },
  { action: "Record Habit", keys: ["ctrl", "h"] },
  { action: "Add Task", keys: ["ctrl", "a"] },
];

const Keybinds = () => {
  return (
    <div className="flex flex-col gap-[2vw]">
      {keybindConfig.map(({ action, keys }, index) => (
        <div key={index}>
          <div className="flex items-center justify-between">
            <h6 className="text-[1.3vw] opacity-90 font-semibold">{action}</h6>
            <div className="flex gap-[0.4vw]">
              {keys.map((item, key) => (
                <span
                  key={key}
                  className="cursor-pointer bg-[#2c2c2c] px-[1vw] py-[0.2vw] font-bold uppercase rounded-[0.4vw] text-[0.9vw]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {index < keybindConfig.length - 1 && (
            <hr className="text-[#2c2c2c] border-1 mt-[2vw]" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Keybinds;
