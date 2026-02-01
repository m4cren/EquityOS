"use client";
import React from "react";
import Footer from "./Footer";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";

const settings = [
   { label: "USER SETTINGS", values: ["Profile", "Privacy"] },
   {
      label: "APP SETTINGS",
      values: ["Appearance", "Accessibility", "Keybinds"],
   },
];
const SideBar = () => {
   const router = useRouter();
   const pathname = usePathname();
   console.log(pathname);
   return (
      <div className="flex items-center justify-end">
         <div className="flex flex-col gap-[1vw] w-[60%] text-[1vw] font-semibold">
            {settings.map(({ label, values }) => (
               <ul key={label} className="flex flex-col gap-[1vw]">
                  <div className="flex flex-col gap-[0.8vw]">
                     <hr className="text-card bg-card h-[0.2vw]" />
                     <h3 className="opacity-50 text-[0.7vw]! ">{label}</h3>
                  </div>
                  <div className="flex flex-col gap-[0.4vw]  ">
                     {values.map((item) => (
                        <li
                           key={item}
                           className={classNames(
                              "hover:bg-card hover:rounded-l-[0.5vw] cursor-pointer transition duration-200",
                              {
                                 "bg-card rounded-l-[0.5vw]":
                                    pathname ===
                                    `/settings/${item.toLowerCase()}`,
                              },
                           )}
                           onClick={() => {
                              router.push(`/settings/${item.toLowerCase()}`);
                           }}
                        >
                           <p className="py-[0.3vw] pl-[0.8vw]"> {item}</p>
                        </li>
                     ))}
                  </div>
               </ul>
            ))}
            <Footer />
         </div>
      </div>
   );
};

export default SideBar;
