import { useShowAmountContext } from "@/lib/context/showAmountProvider";
import { Eye, EyeClosed } from "lucide-react";
import React from "react";

const ShowAmountButton = () => {
  const { isBalanceShown, setIsBalanceShown } = useShowAmountContext();
  return (
    <button
      onClick={() => setIsBalanceShown(!isBalanceShown)}
      className="cursor-pointer opacity-80 hover:opacity-100 hover:scale-108 transition duration-100"
    >
      {!isBalanceShown ? <Eye size={20} /> : <EyeClosed size={20} />}
    </button>
  );
};

export default ShowAmountButton;
