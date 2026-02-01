import Chart from "./_component/Chart";
import ExpenseHistory from "./_component/ExpenseHistory";
import ExpenseCategory from "./_component/ExpenseCategory";
import Header from "../_components/Header";
import Dashboard from "../_components/Dashboard";

const page = () => {
  return (
    <>
      <Header
        label="Expenses"
        quote={`“Every expense is a decision — a choice that speaks volumes about your priorities. Track wisely, spend intentionally, and let every peso support the life you truly want to live.”`}
      />
      <hr className="text-card border-2" />
      <div className="grid grid-cols-[22vw_1fr]">
        <div className="flex flex-col gap-[2vw]">
          <Dashboard />
          <ExpenseCategory />
        </div>

        <div className="flex flex-col gap-[2vw]">
          <ExpenseHistory />
          <Chart />
        </div>
      </div>
    </>
  );
};

export default page;
