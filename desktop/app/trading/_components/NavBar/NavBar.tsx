"use client";

import { useTradeLevel } from "@/store/tradeLevel/useTradeLevel";
import classNames from "classnames";
import { House, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const { xp_lvl } = useTradeLevel();

  // simple level thresholds (keep it light for navbar)
  const levels = [0, 300, 800, 1800, 3500, 6000, 10000, 15000, 22000, 35000];

  const currentIndex =
    levels.findIndex((lvl) => xp_lvl < lvl) === -1
      ? levels.length - 1
      : levels.findIndex((lvl) => xp_lvl < lvl) - 1;

  const currentBase = levels[currentIndex] ?? 0;
  const next = levels[currentIndex + 1];

  const progress = next
    ? ((xp_lvl - currentBase) / (next - currentBase)) * 100
    : 100;
  return (
    <nav className="p-5 px-18 flex items-center border-b border-white/10 justify-between w-full">
      <div>
        <ul className="flex gap-12 items-center text-sm font-medium text-white/75">
          {/* ACCOUNT DROPDOWN */}
          <Link className=" relative" href={"/trading/profile/equity"}>
            <button
              className={classNames(
                "flex cursor-pointer items-center gap-2 p-2",
                {
                  "bg-card rounded-md font-semibold !text-white":
                    pathname.includes(`/trading/profile`),
                }
              )}
            >
              <House />
            </button>
          </Link>

          <Link
            href={"/trading/system"}
            className={classNames("flex items-center gap-2 px-2 py-0.5", {
              "bg-card rounded-md font-semibold !text-white":
                pathname.includes(`/trading/system`),
            })}
          >
            System
          </Link>

          <Link
            href={"/trading/pnl"}
            className={classNames("flex items-center gap-2 px-2 py-0.5", {
              "bg-card rounded-md font-semibold !text-white":
                pathname.includes(`/trading/pnl`),
            })}
          >
            Trade Log
          </Link>
        </ul>
      </div>

      <div className="flex w-1/4 items-center gap-8 justify-end">
        <div className="flex items-center gap-3">
          {/* XP BAR */}
          <div className="bg-flame/20 w-40 h-2 rounded-md overflow-hidden">
            <div
              style={{ width: `${Math.min(progress, 100)}%` }}
              className="bg-flame/70 h-full rounded-md transition-all"
            />
          </div>

          {/* LEVEL */}
          <p className="text-sm font-bold opacity-70">Lv.{currentIndex + 1}</p>
        </div>
        <Link
          className={classNames("flex items-center gap-2 px-2 py-2", {
            "bg-card rounded-md font-semibold !text-white": pathname.includes(
              `/trading/achievements`
            ),
          })}
          href={"/trading/achievements"}
        >
          <Trophy size={18} />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
