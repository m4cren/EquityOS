"use client";

import { useRecordFinance } from "@/store/recordFinanceSlice/useRecordFinance";
import RecordIncome from "./_components/RecordIncome/RecordIncome";
import RecordExpense from "./_components/RecordExpense/RecordExpense";
import RecordTransfer from "./_components/RecordTransfer/RecordTransfer";

const RenderRecordFinance = () => {
  const { handleClose, modalOpen } = useRecordFinance();

  switch (modalOpen) {
    case "expense":
      return <RecordExpense handleClose={handleClose} />;
    case "income":
      return <RecordIncome handleClose={handleClose} />;
    case "transfer":
      return <RecordTransfer handleClose={handleClose} />;
  }
};

export default RenderRecordFinance;
