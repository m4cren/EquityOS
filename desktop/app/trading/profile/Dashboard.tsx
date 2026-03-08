"use client";
import classNames from "classnames";
import {
  BarChart3,
  BookText,
  LayoutDashboard,
  LucideIcon,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const dashboardIconMap: Record<string, LucideIcon> = {
  Equity: LayoutDashboard,
  Performance: TrendingUp,
  Metrics: BarChart3,
  Journal: BookText,
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
                    pathname === `/trading/profile/${key.toLowerCase()}`,
                }
              )}
            >
              <Link
                className="flex items-center gap-[0.5vw]"
                href={key.toLowerCase()}
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
