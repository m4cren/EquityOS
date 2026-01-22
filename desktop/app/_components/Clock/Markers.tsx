import React from "react";

const Markers = ({ position }: { position: string }) => {
   return (
      <span
         className={`w-[0.4vw] h-[0.8vw] rounded-b-2xl bg-[#ececec40] absolute ${position} -translate-y-1/2 -translate-x-1/2`}
      ></span>
   );
};

export default Markers;
