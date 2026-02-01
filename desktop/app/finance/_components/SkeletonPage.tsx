import React from "react";

const SkeletonPage = () => {
   return (
      <>
         <div className="flex flex-col gap-[1vw] -mt-[3vw]">
            <div className="bg-card w-[7vw] h-[7vw] animate-pulse rounded-[0.5vw]" />
            <div className="bg-card w-[25vw] h-[3vw] animate-pulse rounded-[0.5vw]" />
            <div className="flex items-center gap-[1.3vw]">
               <div className="bg-card animate-pulse rounded-[0.3vw] w-[0.25vw] h-[3.5vw]"></div>
               <div className="bg-card w-[69vw] h-[2.5vw] animate-pulse rounded-[0.5vw] " />
            </div>
         </div>
         <hr className="text-card border-2 animate-pulse" />

         <div className="grid grid-cols-[22vw_1fr]">
            <div
               className=" w-[20vw] h-[30vw]
              bg-card animate-pulse rounded-[0.5vw] "
            />

            <div
               className=" w-full h-[35vw]
              bg-card animate-pulse rounded-[0.5vw] "
            />
         </div>
      </>
   );
};

export default SkeletonPage;
