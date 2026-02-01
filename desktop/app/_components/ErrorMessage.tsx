import React from "react";

const ErrorMessage = ({ errMsg }: { errMsg: string }) => {
   return (
      <p className="bg-red-600/30 px-[0.4vw] py-[0.1vw] text-center rounded-[0.2vw] text-[0.7vw]">
         {errMsg}
      </p>
   );
};

export default ErrorMessage;
