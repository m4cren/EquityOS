"use client";

import { ExpenseTypes } from "@/lib/types";
import { Scroll } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Table from "./Table";
import Pagination from "@/app/_components/Pagination";
import { useExpense } from "@/store/RecordExpense/useExpense";
import TableSkeleton from "../../account/_component/TableSkeleton";
import { usePagination } from "@/hooks/usePagination";

const ExpenseHistory = () => {
  const { expense, isPending } = useExpense();
  const searchParams = useSearchParams();
  const pageName = "expense_history_page";
  const currentPage = Number(searchParams.get(pageName));

  const paginatedExpense = usePagination<ExpenseTypes>(expense, currentPage);

  return (
    <div className="relative flex flex-col gap-[1vw] w-full min-h-[24vw] h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
      <div className="flex items-center gap-[0.6vw]">
        <Scroll size={18} />
        <h1 className="text-[0.9vw] font-medium opacity-50">Expense History</h1>
      </div>

      <hr className="text-card border-2" />

      {isPending ? (
        <TableSkeleton />
      ) : expense.length !== 0 ? (
        <>
          <Table items={paginatedExpense} />
          <div className="w-full mx-auto mt-auto">
            <Pagination
              currentPage={currentPage}
              items={expense.length}
              name={pageName}
            />
          </div>
        </>
      ) : (
        <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
          You have no expense history
        </p>
      )}


    </div>
  );
};

export default ExpenseHistory;
