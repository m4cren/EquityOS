import { expenseCategoryIconMap, ExpenseCategoryIconTypes } from "@/lib/types";
import { AlertCircle } from "lucide-react";

interface Props {
   category: string;
   icon: ExpenseCategoryIconTypes;
   allocation: number;
   amount: number;
}
const BudgetCard = ({ category, amount, allocation, icon }: Props) => {
   const IconComponent =
      expenseCategoryIconMap[icon as ExpenseCategoryIconTypes];

   const percentage = ((amount / allocation) * 100).toFixed(0);
   return (
      <li className="bg-card p-[1vw] rounded-[0.6vw] flex flex-col gap-[0.4vw]">
         <div className="flex items-center gap-[0.6vw]">
            <IconComponent size={16} />
            <h3 className="text-[1.1vw] font-bold">{category}</h3>
         </div>
         <div className="flex items-center gap-[0.6vw]">
            <p className="text-[0.8vw] font-medium opacity-60">
               Alloted budget:
            </p>
            <h4 className="text-[0.9vw] font-light opacity-80">
               ₱{allocation.toLocaleString()}
            </h4>
         </div>
         {parseInt(percentage) > 100 ? (
            <p className="flex items-center gap-[0.4vw] text-[0.6vw] w-fit px-[0.8vw] py-[0.25vw] rounded-[0.4vw] bg-red-500/20 text-center">
               Total budget exceeded
               <AlertCircle size={15} />
            </p>
         ) : (
            <div className="flex items-center gap-[0.6vw]">
               <p className="text-[0.8vw] font-bold opacity-60">
                  {percentage}%
               </p>
               <div className=" bg-flame/20 w-full  rounded-full ">
                  <div
                     style={{ width: `${percentage}%` }}
                     className={`bg-flame/70  py-[0.23vw] rounded-full`}
                  ></div>
               </div>
            </div>
         )}
         <h4 className="text-[0.9vw] font-bold">₱{amount.toLocaleString()}</h4>
      </li>
   );
};

export default BudgetCard;
