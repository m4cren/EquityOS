"use client";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { capitalFirstLetter } from "../finance/account/_component/NewAccountForm";

const Template = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const currentPath = pathname.slice(10, pathname.length);

  return (
    <div className="bg-card">
      <div className="flex flex-col gap-[2.25vw] justify-center h-screen w-[80%]  mx-auto">
        <h2 className="text-[2vw] font-bold ">
          {capitalFirstLetter(currentPath)}
        </h2>
        <hr className="text-[#2c2c2c] border-1" />

        {children}
      </div>
    </div>
  );
};

export default Template;
