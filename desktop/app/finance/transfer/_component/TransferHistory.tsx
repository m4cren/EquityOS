"use client";

import { Scroll } from "lucide-react";

import { TransferTypes } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import Table from "./Table";
import ShowAmountButton from "../../_components/ShowAmountButton";
import Pagination from "@/app/_components/Pagination";
import { useTransfer } from "@/store/RecordTransfer/useTransfer";
import { usePagination } from "@/hooks/usePagination";
import TableSkeleton from "../../account/_component/TableSkeleton";

const TransferHistory = () => {
  const { transfer, isPending } = useTransfer();
  const searchParams = useSearchParams();
  const pageName = "transfer_history_page";
  const currentPage = Number(searchParams.get(pageName));

  const paginatedIncome = usePagination<TransferTypes>(transfer, currentPage);

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
      {isPending ? (
        <TableSkeleton />
      ) : transfer.length !== 0 ? (
        <>
          <Table sortedByDate={paginatedIncome} />
          <div className="w-full mx-auto mt-auto">
            <Pagination
              currentPage={currentPage}
              items={transfer.length}
              name={pageName}
            />
          </div>
        </>
      ) : (
        <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
          You have no income history
        </p>
      )}
    </div>
  );
};

export default TransferHistory;
