"use client";
import React from "react";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Home,
  LucideIcon,
  Recycle,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const dashboardIconMap: Record<string, LucideIcon> = {
  Home: Home,
  Account: User,
  Income: BanknoteArrowDown,
  Expenses: BanknoteArrowUp,
  Transfer: Recycle,
};
const Dashboard = () => {
  const pathname = usePathname();
  return (
    <div
      className="flex flex-col gap-[1vw] w-[20vw] h-fit
             border-2 border-card rounded-[0.5vw] p-[1.25vw]"
    >
      <p className="text-[0.9vw] font-medium opacity-50">Dashboard</p>
      <hr className="text-card border-2" />
      <ul className="flex flex-col gap-[0.8vw]">
        {Object.keys(dashboardIconMap).map((key) => {
          const IconComponent = dashboardIconMap[key];
          return (
            <li
              key={key}
              className={classNames(
                "px-[1vw] py-[0.15vw] rounded-[0.3vw] text-[0.9vw] hover:bg-card",
                {
                  "bg-card":
                    pathname === `/finance/${key.toLowerCase()}` ||
                    (pathname === "/finance" && key === "Home"),
                }
              )}
            >
              <Link
                className="flex items-center gap-[0.5vw]"
                href={
                  key === "Home" ? "/finance" : `/finance/${key.toLowerCase()}`
                }
              >
                <IconComponent size={18} />
                {key}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboard;
