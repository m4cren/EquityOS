import React from "react";
import Header from "../_components/Header";

import Dashboard from "../_components/Dashboard";
import TransferHistory from "./_component/TransferHistory";

const page = () => {
  return (
    <>
      <Header
        label="Transfer"
        quote={`“Transfers aren’t just movements of money — they’re shifts in purpose. From saving to investing, from organizing to simplifying, every transfer is a step in aligning your money with your goals.”`}
      />
      <hr className="text-card border-2" />
      <div className="grid grid-cols-[22vw_1fr]">
        <div className="flex flex-col gap-[2vw]">
          <Dashboard />
        </div>

        <TransferHistory />
      </div>
    </>
  );
};

export default page;
