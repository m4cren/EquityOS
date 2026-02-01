import React from "react";

const labels = [
   "MindSync Beta 0.3v",
   "Next.js 15.4.4 (stale)",
   "Archlinux 64-bit",
];

const Footer = () => {
   return (
      <ul className="flex flex-col gap-[1vw]">
         <div className="flex flex-col gap-[0.8vw]">
            <hr className="text-card bg-card h-[0.2vw]" />
            <div className="flex flex-col gap-[0.2vw] pl-[0.8vw]">
               {labels.map((item) => (
                  <h3
                     key={item}
                     className="opacity-50 text-[0.6vw]! font-normal!"
                  >
                     {item}
                  </h3>
               ))}
            </div>
         </div>
      </ul>
   );
};

export default Footer;
