import React from "react";

import Accounts from "./_component/Accounts";
import Details from "./_component/Details";
import Chart from "./_component/Chart";
import Dashboard from "../_components/Dashboard";
import Header from "../_components/Header";

const page = () => {
  return (
    <>
      <Header
        label="Accounts"
        quote={`“Your account is more than just numbers — it’s a reflection of your habits, your discipline, and your vision. Stay aware, stay intentional, and let your account tell a story of growth and clarity.”`}
      />
      <hr className="text-card border-2" />
      <div className="grid grid-cols-[22vw_1fr]">
        <div className="flex flex-col gap-[2vw]">
          <Dashboard />
          <Chart />
        </div>

        <div className="flex flex-col gap-[2vw]">
          <Accounts />
          <Details />
        </div>
      </div>
    </>
  );
};

export default page;
