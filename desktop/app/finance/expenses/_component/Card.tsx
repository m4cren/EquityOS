import { Pencil } from "lucide-react";
import { ReactNode } from "react";

interface Props {
   label: string;
   id: string;
   alloc_per_month: number;
   children: ReactNode;
   setItemToEdit: React.Dispatch<React.SetStateAction<string | null>>;
}

const Card = ({
   alloc_per_month,
   label,
   children,
   setItemToEdit,
   id,
}: Props) => {
   return (
      <li className="flex flex-col gap-[0.4vw] bg-card rounded-[0.4vw] p-[1vw]">
         <div className="flex items-center gap-[0.1vw]">
            {children}
            <h3 className="font-semibold px-[0.5vw] py-[0.1vw] text-[1vw] rounded-[0.4vw]">
               {label}
            </h3>
         </div>
         <div className="flex items-center justify-between">
            <p className="text-[0.8vw] opacity-75 font-medium">
               Allocated Budget: ₱{alloc_per_month.toLocaleString()}
            </p>
            <button
               onClick={() => setItemToEdit(id)}
               className="cursor-pointer"
            >
               <Pencil size={15} />
            </button>
         </div>
      </li>
   );
};

export default Card;
