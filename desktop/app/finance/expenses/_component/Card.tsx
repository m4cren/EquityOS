import { Pencil } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  label: string;
  id: string;
  alloc_per_month: number;

  children: ReactNode;
  setItemToEdit: React.Dispatch<React.SetStateAction<string | null>>;
  totalExpenseThisMonth: number;
  totalExpenseThisYear: number;
}

const Card = ({
  alloc_per_month,

  label,
  children,
  setItemToEdit,
  id,
  totalExpenseThisMonth,
  totalExpenseThisYear,
}: Props) => {
  const alloc_per_year = alloc_per_month * 12;
  console.log(totalExpenseThisMonth, totalExpenseThisYear);
  return (
    <li className="flex flex-col gap-[0.4vw] bg-card rounded-[0.4vw] p-[1vw]">
      <div className="flex items-center gap-[0.1vw]">
        {children}
        <h3 className="font-semibold px-[0.5vw] py-[0.1vw] text-[1vw] rounded-[0.4vw]">
          {label}
        </h3>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          {" "}
          <p className="text-[0.8vw] opacity-75 font-medium">
            Allocated Budget: ₱{alloc_per_month.toLocaleString()}
          </p>
          <div className="flex items-center gap-[0.6vw]">
            <p className="text-[0.8vw] font-bold opacity-60">
              {((totalExpenseThisMonth / alloc_per_month) * 100).toFixed(0)}%
            </p>
            <div className=" bg-flame/20 w-full  rounded-full ">
              <div
                style={{
                  width: `${(totalExpenseThisMonth / alloc_per_month) * 100}%`,
                }}
                className={`bg-flame/70  py-[0.23vw] rounded-full`}
              ></div>
            </div>
          </div>
          <p className="text-[0.8vw] opacity-75 font-medium">
            Annual Budget: ₱{alloc_per_year.toLocaleString()}
          </p>
          <div className="flex items-center gap-[0.6vw]">
            <p className="text-[0.8vw] font-bold opacity-60">
              {((totalExpenseThisYear / alloc_per_year) * 100).toFixed(0)}%
            </p>
            <div className=" bg-flame/20 w-full  rounded-full ">
              <div
                style={{
                  width: `${(totalExpenseThisYear / alloc_per_year) * 100}%`,
                }}
                className={`bg-flame/70  py-[0.23vw] rounded-full`}
              ></div>
            </div>
          </div>
        </div>
        <button onClick={() => setItemToEdit(id)} className="cursor-pointer">
          <Pencil size={15} />
        </button>
      </div>
    </li>
  );
};

export default Card;
