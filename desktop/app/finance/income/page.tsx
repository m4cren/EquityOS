import Dashboard from "../_components/Dashboard";
import Header from "../_components/Header";
import IncomeHistory from "./_component/IncomeHistory";
import IncomeTypes from "./_component/IncomeTypes";
import PieChartComponent from "./_component/PieChart";

const page = () => {
  return (
    <>
      <Header
        label="Income"
        quote={`“Every source of income is a building block toward your future. Whether big or small, consistent or rare, your income represents your value, your effort, and your potential to create lasting impact.”`}
      />
      <hr className="text-card border-2" />
      <div className="grid grid-cols-[22vw_1fr]">
        <div className="flex flex-col gap-[2vw]">
          <Dashboard />
          <IncomeTypes />
        </div>
        <div className="flex flex-col gap-[2vw]">
          <IncomeHistory />
          <PieChartComponent />
        </div>
      </div>
    </>
  );
};

export default page;
