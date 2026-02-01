import React, { Suspense } from "react";
import SkeletonPage from "./_components/SkeletonPage";
import Header from "./_components/Header";
import Dashboard from "./_components/Dashboard";
import Accounts from "./_components/Accounts/Accounts";
import MonthlyBudget from "./_components/MonthlyBudget/MonthlyBudget";
import Chart from "./_components/NetWorth/Chart";

const page = () => {
  return (
    <Suspense fallback={<SkeletonPage />}>
      <>
        <Header
          label="Finance Tracker"
          quote={`"Increase your income, Increase your savings, Increase your investment returns, Decrease your expenses"`}
        />
        <hr className="text-card border-2" />

        <div className="grid grid-cols-[22vw_1fr]">
          <div className="flex flex-col gap-[2vw]">
            <Dashboard />
            <Accounts />
          </div>

          <div className="flex flex-col gap-[2vw]">
            <MonthlyBudget />
            <Chart />
          </div>
        </div>
      </>
    </Suspense>
  );
};

export default page;
