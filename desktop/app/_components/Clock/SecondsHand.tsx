import React from "react";

const SecondsHand = ({ rotation }: { rotation: number }) => {
   return (
      <span
         style={{ transform: `rotate(${rotation}deg)` }}
         className={`absolute  h-[100%] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center   `}
      >
         <span className="h-[45%] transition duration-75  w-[0.2vw] [box-shadow:0_0_6px_rgba(0,0,0,0.6)] bg-[#ececec70] absolute top-[33%] left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-t-full"></span>
      </span>
   );
};

export default SecondsHand;
