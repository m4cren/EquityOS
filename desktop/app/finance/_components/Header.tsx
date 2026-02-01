import {
   BanknoteArrowDown,
   BanknoteArrowUp,
   Landmark,
   LucideIcon,
   Recycle,
   User,
} from "lucide-react";
import React from "react";

interface Props {
   label: string;
   quote?: string;
}

const pageIconMap: Record<string, LucideIcon> = {
   "Finance Tracker": Landmark,
   Accounts: User,
   Income: BanknoteArrowDown,
   Expenses: BanknoteArrowUp,
   Transfer: Recycle,
};

const Header = ({ label, quote }: Props) => {
   const IconComponent = pageIconMap[label];
   return (
      <div className="flex flex-col gap-[1vw] -mt-[3vw]">
         <IconComponent size={100} />
         <h1 className="text-[2vw] font-bold">{label}</h1>
         {quote && (
            <div className="flex items-center gap-[1.3vw]">
               <div className="bg-[#d4d4d450] w-[0.25vw] h-[3.5vw]"></div>
               <p className="text-[1vw] max-w-[69vw]">
                  <i>{quote}</i>
               </p>
            </div>
         )}
      </div>
   );
};

export default Header;
