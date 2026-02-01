"use client";

import { Scroll } from "lucide-react";

import { TransferTypes } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import Table from "./Table";
import ShowAmountButton from "../../_components/ShowAmountButton";
import Pagination from "@/app/_components/Pagination";

// 🔹 STATIC DUMMY TRANSFERS
const dummyTransfers = [
  {
    id: "1",
    amount: 5000,
    from_acc: "Savings",
    from_acc_icon: "bank",
    to_acc: "Cash",
    to_acc_icon: "wallet",
    date_str: "Jan 05 2024",
    created_at: new Date(),
  },
  {
    id: "2",
    amount: 1200,
    from_acc: "Cash",
    from_acc_icon: "wallet",
    to_acc: "Credit",
    to_acc_icon: "card",
    date_str: "Jan 12 2024",
    created_at: new Date(),
  },
  {
    id: "3",
    amount: 3000,
    from_acc: "Savings",
    from_acc_icon: "bank",
    to_acc: "Cash",
    to_acc_icon: "wallet",
    date_str: "Feb 01 2024",
    created_at: new Date(),
  },
  {
    id: "4",
    amount: 4500,
    from_acc: "Credit",
    from_acc_icon: "card",
    to_acc: "Savings",
    to_acc_icon: "bank",
    date_str: "Feb 10 2024",
    created_at: new Date(),
  },
  {
    id: "5",
    amount: 2000,
    from_acc: "Cash",
    from_acc_icon: "wallet",
    to_acc: "Savings",
    to_acc_icon: "bank",
    date_str: "Mar 02 2024",
    created_at: new Date(),
  },
] satisfies TransferTypes[];

const PAGE_SIZE = 5;

const TransferHistory = () => {
  const searchParams = useSearchParams();
  const paramsName = "transfer_history_page";
  const currentPage = Number(searchParams.get(paramsName)) || 1;

  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedTransfer = dummyTransfers.slice(start, start + PAGE_SIZE);

  return (
    <div className="relative min-h-[24vw] flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.6vw]">
          <Scroll size={18} />
          <h1 className="text-[0.9vw] font-medium opacity-50">
            Transfer History
          </h1>
        </div>
        <ShowAmountButton />
      </div>

      <hr className="text-card border-2" />

      {dummyTransfers.length !== 0 ? (
        <>
          <Table sortedByDate={paginatedTransfer} />
          <div className="absolute top-[90%] left-1/2 -translate-y-1/2 -translate-x-1/2">
            <Pagination
              name={paramsName}
              currentPage={currentPage}
              items={dummyTransfers.length}
            />
          </div>
        </>
      ) : (
        <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
          You have no transfer transactions
        </p>
      )}
    </div>
  );
};

export default TransferHistory;
