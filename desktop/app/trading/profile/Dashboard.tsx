"use client";

import { useTradeAccount } from "@/store/tradeAccount/useTradeAccount";
import classNames from "classnames";
import {
  BookText,
  ChevronDown,
  LayoutDashboard,
  LucideIcon,
  TrendingUp,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";

const dashboardIconMap: Record<string, LucideIcon> = {
  Equity: LayoutDashboard,
  Performance: TrendingUp,
  Journal: BookText,
};

const Dashboard = () => {
  const pathname = usePathname();
  const { tradeAccount, setSelectedTradeAcc, selectedTradeAcc, dispatch } =
    useTradeAccount();

  const [open, setOpen] = useState(false);

  const accountLabel = useMemo(() => {
    if (selectedTradeAcc === "funded_m4cren") return "Funded M4cren";
    if (selectedTradeAcc === "m4cren") return "M4cren";
    return selectedTradeAcc;
  }, [selectedTradeAcc]);

  return (
    <div className="w-[20vw] min-w-[260px] h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
          Dashboard
        </p>
      </div>

      <div className="mb-5 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

      <div className="flex flex-col gap-4">
        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={classNames(
              "group flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 transition-all duration-200",
              "hover:border-white/15 hover:bg-white/[0.05]",
              {
                "border-white/15 bg-white/[0.06]": open,
              }
            )}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/8 text-white/80">
                <User size={16} />
              </div>

              <div className="min-w-0 text-left">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/35">
                  Active Account
                </p>
                <p className="truncate text-sm font-semibold text-white">
                  {accountLabel}
                </p>
              </div>
            </div>

            <ChevronDown
              size={16}
              className={classNames(
                "shrink-0 text-white/50 transition-transform duration-200",
                {
                  "rotate-180": open,
                }
              )}
            />
          </button>

          {open && (
            <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 overflow-hidden rounded-xl border border-white/10 bg-[#111111] shadow-2xl">
              <div className="p-1.5">
                {tradeAccount.map((acc) => {
                  const isActive = acc === selectedTradeAcc;

                  return (
                    <button
                      key={acc}
                      onClick={() => {
                        dispatch(setSelectedTradeAcc(acc));
                        setOpen(false);
                      }}
                      className={classNames(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                        {
                          "bg-white/10 font-semibold text-white": isActive,
                          "text-white/75 hover:bg-white/5 hover:text-white":
                            !isActive,
                        }
                      )}
                    >
                      <span className="truncate">
                        {acc === "funded_m4cren" ? "Funded M4cren" : "M4cren"}
                      </span>

                      {isActive && (
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/70">
                          Active
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <ul className="flex flex-col gap-1.5">
          {Object.keys(dashboardIconMap).map((key) => {
            const IconComponent = dashboardIconMap[key];
            const href = `/trading/profile/${key.toLowerCase()}`;
            const isActive = pathname === href;

            return (
              <li key={key}>
                <Link
                  className={classNames(
                    "group flex items-center justify-between rounded-xl px-3.5 py-3 text-sm transition-all duration-200",
                    {
                      "bg-card text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]":
                        isActive,
                      "text-white/65 hover:bg-white/[0.04] hover:text-white":
                        !isActive,
                    }
                  )}
                  href={href}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={classNames(
                        "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                        {
                          "bg-white/10 text-white": isActive,
                          "bg-white/[0.04] text-white/60 group-hover:bg-white/[0.08] group-hover:text-white":
                            !isActive,
                        }
                      )}
                    >
                      <IconComponent size={17} />
                    </div>

                    <span className="font-medium">{key}</span>
                  </div>

                  {isActive && (
                    <div className="h-2 w-2 rounded-full bg-flame/80 shadow-[0_0_12px_rgba(255,140,0,0.45)]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
