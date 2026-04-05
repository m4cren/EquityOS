"use client";

import { useTradeAccount } from "@/store/tradeAccount/useTradeAccount";
import classNames from "classnames";
import {
  BookText,
  ChevronDown,
  LayoutDashboard,
  LucideIcon,
  Plus,
  TrendingUp,
  User,
  Wallet,
  X,
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
  const {
    tradeAccount,
    setSelectedTradeAcc,
    addTradeAccount,
    selectedTradeAcc,
    dispatch,
  } = useTradeAccount();

  const [open, setOpen] = useState(false);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);

  const [formData, setFormData] = useState({
    acc_name: "",
    base_equity: "",
    is_funded: false,
  });

  const hasNoAccounts = tradeAccount.length === 0;
  const isAddAccountModalOpen = hasNoAccounts || showAddAccountModal;

  const selectedAccountData = useMemo(() => {
    return tradeAccount.find((acc) => acc.acc_name === selectedTradeAcc);
  }, [tradeAccount, selectedTradeAcc]);

  const resetForm = () => {
    setFormData({
      acc_name: "",
      base_equity: "",
      is_funded: false,
    });
  };

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = formData.acc_name.trim();
    const parsedBalance = Number(formData.base_equity);

    if (!trimmedName) return;
    if (!Number.isFinite(parsedBalance) || parsedBalance <= 0) return;

    const isDuplicate = tradeAccount.some(
      (acc) => acc.acc_name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) return;

    const newAccount = {
      acc_id: crypto.randomUUID(),
      acc_name: trimmedName,
      base_equity: parsedBalance,
      equity: parsedBalance,
      is_funded: formData.is_funded,
    };

    dispatch(addTradeAccount(newAccount));
    dispatch(setSelectedTradeAcc(trimmedName));

    resetForm();
    setShowAddAccountModal(false);
    setOpen(false);
  };

  return (
    <>
      <div className="w-full lg:w-[20vw] lg:min-w-[260px] h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
            Dashboard
          </p>
        </div>

        <div className="mb-5 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

        <div className="flex flex-col gap-4">
          <div className="relative">
            <button
              onClick={() => {
                if (hasNoAccounts) {
                  setShowAddAccountModal(true);
                  return;
                }
                setOpen((prev) => !prev);
              }}
              className={classNames(
                "group flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 transition-all duration-200",
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
                    {hasNoAccounts ? "No account yet" : selectedTradeAcc}
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

            {!hasNoAccounts && selectedAccountData && (
              <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.025] px-3.5 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/35">
                      Balance
                    </p>
                    <p className="text-sm font-semibold text-white">
                      ${selectedAccountData.equity.toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={classNames(
                      "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
                      {
                        "bg-emerald-500/12 text-emerald-300":
                          selectedAccountData.is_funded,
                        "bg-white/8 text-white/65":
                          !selectedAccountData.is_funded,
                      }
                    )}
                  >
                    {selectedAccountData.is_funded ? "Funded" : "Personal"}
                  </span>
                </div>
              </div>
            )}

            {open && !hasNoAccounts && (
              <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 overflow-hidden rounded-xl border border-white/10 bg-[#111111] shadow-2xl">
                <div className="p-1.5">
                  {tradeAccount.map(({ acc_name, is_funded }) => {
                    const isActive = acc_name === selectedTradeAcc;

                    return (
                      <button
                        key={acc_name}
                        onClick={() => {
                          dispatch(setSelectedTradeAcc(acc_name));
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
                        <div className="min-w-0">
                          <span className="block truncate">{acc_name}</span>
                          <span className="text-[10px] uppercase tracking-wide text-white/40">
                            {is_funded ? "Funded" : "Personal"}
                          </span>
                        </div>

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

          <button
            onClick={() => {
              setShowAddAccountModal(true);
              setOpen(false);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.03] px-3.5 py-3 text-sm font-medium text-white/75 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
          >
            <Plus size={16} />
            Add Account
          </button>

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

      {isAddAccountModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f0f0f] p-5 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/8 text-white/80">
                  <Wallet size={18} />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-white">
                    {hasNoAccounts
                      ? "Initialize Account"
                      : "Add Trading Account"}
                  </h2>
                  <p className="mt-1 text-sm text-white/45">
                    {hasNoAccounts
                      ? "Create your first trading account to get started."
                      : "Add another account to track separately."}
                  </p>
                </div>
              </div>

              {!hasNoAccounts && (
                <button
                  onClick={() => {
                    setShowAddAccountModal(false);
                    resetForm();
                  }}
                  className="rounded-lg p-2 text-white/45 transition hover:bg-white/5 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <form onSubmit={handleAddAccount} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-white/45">
                  Account Name
                </label>
                <input
                  type="text"
                  value={formData.acc_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      acc_name: e.target.value,
                    }))
                  }
                  placeholder="e.g. FTMO Swing"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/20 focus:bg-white/[0.045]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-white/45">
                  Initial Balance
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.base_equity}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      base_equity: e.target.value,
                    }))
                  }
                  placeholder="e.g. 10000"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/20 focus:bg-white/[0.045]"
                />
              </div>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-white">
                    Funded Account
                  </p>
                  <p className="text-xs text-white/45">
                    Toggle this on if the account is funded.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={formData.is_funded}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      is_funded: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-white"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                {hasNoAccounts ? "Initialize Account" : "Add Account"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
