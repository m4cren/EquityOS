"use client";

import { IncomeTypes } from "@/lib/types";
import { Scroll } from "lucide-react";

import ShowAmountButton from "../../_components/ShowAmountButton";
import Pagination from "@/app/_components/Pagination";
import { useIncome } from "@/store/RecordIcome/useIncome";
import { useSearchParams } from "next/navigation";
import { usePagination } from "@/hooks/usePagination";
import TableSkeleton from "../../account/_component/TableSkeleton";
import Table from "./Table";

const IncomeHistory = () => {
  const { income, isPending } = useIncome();
  const searchParams = useSearchParams();
  const pageName = "income_history_page";
  const currentPage = Number(searchParams.get(pageName));

  const paginatedIncome = usePagination<IncomeTypes>(income, currentPage);

  return (
    <div className="relative min-h-[24vw] flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.6vw]">
          <Scroll size={18} />
          <h1 className="text-[0.9vw] font-medium opacity-50">
            Income History Table
          </h1>
        </div>
        <ShowAmountButton />
      </div>

      <hr className="text-card border-2" />

      {isPending ? (
        <TableSkeleton />
      ) : income.length !== 0 ? (
        <>
          <Table sortedByDate={paginatedIncome} />
          <div className="w-full mx-auto mt-auto">
            <Pagination
              currentPage={currentPage}
              items={income.length}
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

export default IncomeHistory;
