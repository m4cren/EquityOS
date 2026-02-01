import React from "react";

const skeletonCount = [1, 2, 3, 4, 5];

const SkeletonCard = () => {
   return (
      <ul className="flex flex-col gap-[0.6vw]">
         {skeletonCount.map((_, key) => (
            <li key={key} className="animate-pulse h-20 bg-card rounded-sm" />
         ))}
      </ul>
   );
};

export default SkeletonCard;
