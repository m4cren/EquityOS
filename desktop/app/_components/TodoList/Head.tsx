import { Funnel } from "lucide-react";
import React from "react";

const Head = () => {
  return (
    <div className="flex items-center justify-between">
      <h5 className="text-lg font-bold">To-Do List</h5>
      <button className="cursor-pointer">
        <Funnel size={20} />
      </button>
    </div>
  );
};

export default Head;
