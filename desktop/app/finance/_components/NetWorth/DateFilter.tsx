import { FiltererTypes } from "@/lib/types";
import classNames from "classnames";
import { XIcon } from "lucide-react";
import React from "react";

const dateFilters: { label: string; value: FiltererTypes }[] = [
   { label: "Daily", value: null },
   { label: "Monthly", value: "Month" },
   { label: "Yearly", value: "Year" },
];
interface Props {
   setIsFilter: React.Dispatch<React.SetStateAction<boolean>>;
   setFilterChart: React.Dispatch<React.SetStateAction<FiltererTypes>>;
   filterChart: FiltererTypes;
}
const DateFilter = ({ filterChart, setIsFilter, setFilterChart }: Props) => {
   return (
      <div className="absolute top-0 right-0 z-8 flex flex-col gap-[0.8vw] bg-card w-[20vw] h-fit rounded-[0.7vw] p-[1vw] shadow-2xl">
         <div className="flex items-center justify-between">
            <p className="text-[0.85vw] opacity-50">Filter by</p>
            <XIcon
               className="cursor-pointer"
               size={20}
               onClick={() => setIsFilter(false)}
            />
         </div>
         <hr className="opacity-10" />
         <ul className="flex flex-col gap-[0.4vw]">
            {dateFilters.map(({ label, value }, key) => (
               <li
                  key={key}
                  onClick={() => {
                     setFilterChart(value);
                     setIsFilter(false);
                  }}
                  className={classNames(
                     "flex items-center gap-[0.6vw] text-[1vw] cursor-pointer hover:bg-[#d4d4d410] py-[0.25vw] rounded-[0.4vw] px-[0.65vw]",
                     {
                        "bg-[#d4d4d410]": filterChart === value,
                     },
                  )}
               >
                  {label}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default DateFilter;
