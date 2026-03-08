import { PropsWithChildren } from "react";
import Dashboard from "./Dashboard";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-cols-[20rem_1fr] p-10">
      <Dashboard />
      {children}
    </div>
  );
};

export default layout;
