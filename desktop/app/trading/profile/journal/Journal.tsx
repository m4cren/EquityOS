"use client";

import classNames from "classnames";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useTradeAccount } from "@/store/tradeAccount/useTradeAccount";
import { useTradeHistory } from "@/store/tradeHistory/useTradeHistory";

const PAGE_SIZE = 8;

const formatDateTime = (value?: string | null) => {
  if (!value) return "—";

  const date = new Date(value);

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const formatTradeDuration = (
  openTime?: string | null,
  closeTime?: string | null
) => {
  if (!openTime || !closeTime) return "—";

  const start = new Date(openTime).getTime();
  const end = new Date(closeTime).getTime();

  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return "—";

  const totalMinutes = Math.round((end - start) / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours <= 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;

  return `${hours}h ${minutes}m`;
};

const formatR = (value?: number | null) => {
  if (value === null || value === undefined) return "—";
  return `${value > 0 ? "+" : ""}${value}R`;
};

const Journal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { selectedTradeAcc } = useTradeAccount();
  const { tradeHistory } = useTradeHistory();

  const [search, setSearch] = useState("");
  const [selectedTrade, setSelectedTrade] = useState<
    (typeof tradeHistory)[number] | null
  >(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [profitableOnly, setProfitableOnly] = useState(true);

  const currentPageParam = Number(searchParams.get("journalPage") || 0);
  const currentPage = Number.isNaN(currentPageParam) ? 0 : currentPageParam;

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("journalPage", String(Math.max(0, page)));
    router.push("?" + params.toString(), { scroll: false });
  };

  const filteredTrades = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tradeHistory
      .filter((trade) => trade.accounts.includes(selectedTradeAcc))
      .filter((trade) => {
        if (!profitableOnly) return true;
        return (trade.pnl ?? 0) > 0;
      })
      .filter((trade) => {
        if (!query) return true;

        return [
          trade.pair,
          trade.type,
          trade.tierSetup,
          trade.notes,
          trade.postNotes,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      })
      .sort(
        (a, b) =>
          new Date(b.openTime).getTime() - new Date(a.openTime).getTime()
      );
  }, [tradeHistory, selectedTradeAcc, search, profitableOnly]);

  const totalPages = Math.max(1, Math.ceil(filteredTrades.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(0, currentPage), totalPages - 1);

  const paginatedTrades = useMemo(() => {
    const startIndex = safePage * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return filteredTrades.slice(startIndex, endIndex);
  }, [filteredTrades, safePage]);

  useEffect(() => {
    if (currentPage !== safePage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("journalPage", String(safePage));
      router.replace("?" + params.toString(), { scroll: false });
    }
  }, [currentPage, safePage, router, searchParams]);

  useEffect(() => {
    const current = searchParams.get("journalPage");

    if (current !== "0") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("journalPage", "0");
      router.replace("?" + params.toString(), { scroll: false });
    }
  }, [selectedTradeAcc, profitableOnly]);
  const tradeCount = filteredTrades.length;
  const totalR = filteredTrades.reduce(
    (sum, trade) => sum + (trade.pnl ?? 0),
    0
  );
  const totalUsd = filteredTrades.reduce(
    (sum, trade) => sum + (trade.pnl_in_usd ?? 0),
    0
  );

  const modalContent = selectedTrade ? (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
      onClick={() => setSelectedTrade(null)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card max-h-[90vh] w-[950px] space-y-8 overflow-y-auto rounded-2xl p-8 shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-2xl font-semibold">{selectedTrade.pair}</h3>
            <p className="text-xs text-white/50">Trade Details</p>
          </div>

          <span
            className={`rounded-full px-4 py-1 text-sm font-medium ${
              selectedTrade.type === "Short"
                ? "bg-red-500/20 text-red-300"
                : "bg-green-500/20 text-green-300"
            }`}
          >
            {selectedTrade.type}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[
            {
              label: "Open Time",
              value: formatDateTime(selectedTrade.openTime),
            },
            {
              label: "Close Time",
              value: formatDateTime(selectedTrade.closeTime),
            },
            {
              label: "Duration",
              value: formatTradeDuration(
                selectedTrade.openTime,
                selectedTrade.closeTime
              ),
            },
            { label: "Risk", value: `${selectedTrade.risk}%` },
            { label: "Tier Setup", value: selectedTrade.tierSetup },
          ].map((item, i) => (
            <div key={i} className="rounded-lg bg-white/5 p-4">
              <p className="mb-1 text-xs text-white/50">{item.label}</p>
              <p className="text-sm font-medium">{item.value || "-"}</p>
            </div>
          ))}

          <div className="rounded-lg bg-white/5 p-4">
            <p className="mb-1 text-xs text-white/50">PnL</p>
            <p
              className={`text-sm font-semibold ${
                typeof selectedTrade.pnl === "number"
                  ? selectedTrade.pnl > 0
                    ? "text-green-400"
                    : "text-red-400"
                  : ""
              }`}
            >
              {typeof selectedTrade.pnl === "number"
                ? `${selectedTrade.pnl > 0 ? "+" : ""}${selectedTrade.pnl}R`
                : selectedTrade.pnl}
            </p>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold">Setup Criteria</h4>

          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              ["Refined entry", selectedTrade.setupCriteria.isRefined],
              [
                "Above / Below opening price",
                selectedTrade.setupCriteria.isBelowOrAboveOpeningPrice,
              ],
              ["MSS occurred", selectedTrade.setupCriteria.isMssOccured],
              ["IFVG", selectedTrade.setupCriteria.isIFVG],
              ["FVG", selectedTrade.setupCriteria.isFVG],
              ["Displacement", selectedTrade.setupCriteria.isDisplacement],
              ["Liquidity sweep", selectedTrade.setupCriteria.isLiquiditySweep],
              ["POI mitigated", selectedTrade.setupCriteria.isPoiMitigated],
            ].map(([label, checked], i) => (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  checked ? "bg-green-500/10 text-green-300" : "bg-white/5"
                }`}
              >
                <input type="checkbox" checked={checked as boolean} readOnly />
                {label}
              </div>
            ))}
          </div>
        </div>

        {selectedTrade.preSetupImg && selectedTrade.preSetupImg.length > 0 && (
          <div>
            <h4 className="mb-4 text-lg font-semibold">Pre Setup</h4>

            <div className="grid grid-cols-2 gap-4">
              {selectedTrade.preSetupImg.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Pre setup ${index + 1}`}
                  className="cursor-zoom-in rounded-xl border border-white/10 transition hover:border-white/30"
                  onClick={() => setPreviewImg(img)}
                />
              ))}
            </div>
          </div>
        )}

        {selectedTrade.notes && (
          <div>
            <h4 className="mb-2 text-lg font-semibold">Notes</h4>
            <div className="rounded-lg bg-white/5 p-4 text-sm text-white/80">
              {selectedTrade.notes}
            </div>
          </div>
        )}

        {selectedTrade.postSetupImg && (
          <div>
            <h4 className="mb-4 text-lg font-semibold">Post Setup</h4>

            <img
              src={selectedTrade.postSetupImg}
              alt="Post setup"
              className="cursor-zoom-in rounded-xl border border-white/10 transition hover:border-white/30"
              onClick={() => setPreviewImg(selectedTrade.postSetupImg!)}
            />
          </div>
        )}

        {selectedTrade.postNotes && (
          <div>
            <h4 className="mb-2 text-lg font-semibold">Post Trade Notes</h4>
            <div className="rounded-lg bg-white/5 p-4 text-sm text-white/80">
              {selectedTrade.postNotes}
            </div>
          </div>
        )}

        <div className="flex justify-end border-t border-white/10 pt-6">
          <button
            onClick={() => setSelectedTrade(null)}
            className="rounded-md bg-white/10 px-5 py-2 text-sm transition hover:bg-white/20"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;

  const previewContent = previewImg ? (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80"
      onClick={() => setPreviewImg(null)}
    >
      <img
        src={previewImg}
        className="max-h-[90vh] max-w-[90vw] rounded-lg"
        alt="Preview"
      />
    </div>
  ) : null;

  return (
    <>
      <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-white backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              Journal
            </p>
            <h2 className="mt-1 text-2xl font-semibold">Winning Trades</h2>
            <p className="mt-1 text-sm text-white/45">
              Showing trades for{" "}
              <span className="font-medium text-white/70">
                {selectedTradeAcc}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/35">
                Trades
              </p>
              <p className="mt-1 text-lg font-semibold">{tradeCount}</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/35">
                Net R
              </p>
              <p
                className={classNames("mt-1 text-lg font-semibold", {
                  "text-green-400": totalR >= 0,
                  "text-red-400": totalR < 0,
                })}
              >
                {totalR >= 0 ? "+" : ""}
                {totalR.toFixed(2)}R
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/35">
                Net USD
              </p>
              <p
                className={classNames("mt-1 text-lg font-semibold", {
                  "text-green-400": totalUsd >= 0,
                  "text-red-400": totalUsd < 0,
                })}
              >
                {totalUsd >= 0 ? "+" : ""}
                {totalUsd.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 lg:w-[420px]">
            <Search size={16} className="shrink-0 text-white/40" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleChangePage(0);
              }}
              placeholder="Search pair, setup, notes..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  handleChangePage(0);
                }}
                className="text-white/35 transition hover:text-white/70"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            onClick={() => setProfitableOnly((prev) => !prev)}
            className="flex h-fit items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75 transition hover:bg-white/[0.04]"
          >
            <input type="checkbox" checked={profitableOnly} readOnly />
            Profitable trades only
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
          <div className="grid grid-cols-[0.5fr_0.8fr_1.1fr_0.6fr_0.4fr_40px] gap-3 border-b border-white/10 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
            <p>Pair / Type</p>
            <p>Opened</p>
            <p>Setup</p>
            <p>Duration</p>
            <p>Result</p>
            <p />
          </div>

          <div className="flex flex-col">
            {paginatedTrades.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-white/40">
                No trades found.
              </div>
            ) : (
              paginatedTrades.map((trade) => (
                <button
                  key={trade.id}
                  onClick={() => setSelectedTrade(trade)}
                  className="grid cursor-pointer grid-cols-[0.5fr_0.8fr_1.1fr_0.6fr_0.4fr_40px] gap-3 border-b border-white/5 px-4 py-4 text-left transition hover:bg-white/[0.03]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {trade.pair || "—"}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={classNames(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                          trade.type === "Short"
                            ? "bg-red-500/15 text-red-300"
                            : "bg-green-500/15 text-green-300"
                        )}
                      >
                        {trade.type || "—"}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-white/70">
                    {formatDateTime(trade.openTime)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white/80">
                      {trade.tierSetup || "—"}
                    </p>
                    <p className="mt-1 truncate text-xs text-white/35">
                      {trade.notes || "No notes"}
                    </p>
                  </div>

                  <div className="text-sm text-white/70">
                    {formatTradeDuration(trade.openTime, trade.closeTime)}
                  </div>

                  <div>
                    <p
                      className={classNames("text-sm font-semibold", {
                        "text-green-400": (trade.pnl ?? 0) >= 0,
                        "text-red-400": (trade.pnl ?? 0) < 0,
                      })}
                    >
                      {formatR(trade.pnl)}
                    </p>
                    <p
                      className={classNames("mt-1 text-xs", {
                        "text-white/35": (trade.pnl_in_usd ?? 0) >= 0,
                        "text-red-300/70": (trade.pnl_in_usd ?? 0) < 0,
                      })}
                    >
                      {(trade.pnl_in_usd ?? 0) >= 0 ? "+" : ""}
                      {(trade.pnl_in_usd ?? 0).toFixed(2)} USD
                    </p>
                  </div>

                  <div className="flex items-center justify-end text-white/30">
                    <ChevronRight size={16} />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {filteredTrades.length > PAGE_SIZE && (
          <div className="flex items-center justify-center gap-[1vw] pt-2">
            <button
              disabled={safePage === 0}
              className="cursor-pointer opacity-80 disabled:opacity-25"
              onClick={() => handleChangePage(safePage - 1)}
            >
              <ChevronLeft size={25} />
            </button>

            <div className="flex items-center gap-[0.4vw]">
              <p className="text-xs font-medium opacity-75">
                Page {safePage + 1} of {totalPages}
              </p>
            </div>

            <button
              onClick={() => handleChangePage(safePage + 1)}
              disabled={safePage === totalPages - 1}
              className="cursor-pointer opacity-80 disabled:opacity-25"
            >
              <ChevronRight size={25} />
            </button>
          </div>
        )}
      </div>

      {previewContent ? createPortal(previewContent, document.body) : null}
      {modalContent ? createPortal(modalContent, document.body) : null}
    </>
  );
};

export default Journal;
