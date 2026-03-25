"use client";

import { useTradeAccount } from "@/store/tradeAccount/useTradeAccount";

import classNames from "classnames";
import { ChevronDown, House, Trophy, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavBar = () => {
  const pathname = usePathname();

  const { tradeAccount, setSelectedTradeAcc, selectedTradeAcc, dispatch } =
    useTradeAccount();

  const [open, setOpen] = useState(false);

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

            {open && (
              <div className="absolute top-full mt-2 w-44 bg-card border border-white/10 rounded-md shadow-lg overflow-hidden z-50">
                {tradeAccount.map((acc) => (
                  <button
                    key={acc}
                    onClick={() => {
                      dispatch(setSelectedTradeAcc(acc));
                      setOpen(false);
                    }}
                    className={classNames(
                      "w-full text-left px-3 py-2 text-sm hover:bg-white/10",
                      {
                        "bg-white/10 text-white font-semibold":
                          acc === selectedTradeAcc,
                      }
                    )}
                  >
                    {acc}
                  </button>
                ))}
              </div>
            )}
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
        <div className="flex items-center gap-[0.6vw]">
          <div className="bg-flame/20 w-50 h-2.5 rounded-md">
            <div
              style={{ width: "35%" }}
              className="bg-flame/70 h-full rounded-md"
            />
          </div>
          <p className="text-sm font-bold opacity-60">10</p>
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
