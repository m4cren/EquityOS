import { Eye, EyeClosed } from "lucide-react";
import React from "react";

const ShowAmountButton = () => {
  return (
    <button
      onClick={() => {}}
      className="cursor-pointer opacity-80 hover:opacity-100 hover:scale-108 transition duration-100"
    >
      {true ? <Eye size={20} /> : <EyeClosed size={20} />}
    </button>
  );
};

export default ShowAmountButton;
