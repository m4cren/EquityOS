import React from "react";

const CardSkeleton = () => {
   const skeletonCount = [1, 2, 3, 4, 5, 6];
   return (
      <ul className="grid grid-cols-3 gap-[1.2vw]">
         {skeletonCount.map((_, key) => (
            <li
               key={key}
               className="bg-card animate-pulse h-[6.5vw]  rounded-[0.6vw] "
            ></li>
         ))}
      </ul>
   );
};

export default CardSkeleton;
