import { PropsWithChildren } from "react";
import Dashboard from "./Dashboard";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-cols-[18rem_1fr] p-10 gap-8">
      <div className="flex flex-col gap-4">
        <Dashboard />
      </div>
      {children}
    </div>
  );
};

export default layout;
