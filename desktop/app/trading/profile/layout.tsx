import { PropsWithChildren } from "react";
import Dashboard from "./Dashboard";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-cols-[18rem_1fr] p-10 gap-8">
      <div className="flex flex-col gap-4">
        {" "}
        <Dashboard />
        <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm w-full text-white/70">
          <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
          Last Trade · 2H Ago
        </div>
      </div>
      {children}
    </div>
  );
};

export default layout;
