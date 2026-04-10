"use client";

import React from "react";
import classNames from "classnames";
import { TradeFormData } from "@/lib/types";

type TradeItem = TradeFormData;

type Props = {
  dateLabel: string;
  trades: TradeItem[];
  onClose: () => void;
  onOpenTrade: (tradeId: string) => void;
};

const DayTradesModal: React.FC<Props> = ({
  dateLabel,
  trades,
  onClose,
  onOpenTrade,
}) => {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card w-full max-w-[720px] max-h-[85vh] overflow-y-auto rounded-2xl shadow-xl p-6 space-y-5"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-semibold">Trades for {dateLabel}</h2>
            <p className="text-sm text-white/50">
              Click a trade to open its details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
          >
            Close
          </button>
        </div>

        {trades.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-sm text-white/60">
            No trades recorded for this day.
          </div>
        ) : (
          <div className="space-y-3">
            {trades.map((trade) => {
              const isClosed = !!trade.closeTime;
              const isWin = isClosed && (trade.pnl ?? 0) > 0;
              const isLoss = isClosed && (trade.pnl ?? 0) < 0;
              const isBreakeven = isClosed && (trade.pnl ?? 0) === 0;

              return (
                <button
                  key={trade.trade_id}
                  type="button"
                  onClick={() => onOpenTrade(trade.trade_id!)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/[0.07]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold">
                        {trade.pair || "No Pair"}
                      </p>
                      <p className="text-sm text-white/55">
                        {trade.type} ·{" "}
                        {trade.openTime.split("T")[1]?.slice(0, 5)}
                      </p>
                    </div>

                    <div
                      className={classNames(
                        "rounded-full px-3 py-1 text-sm font-semibold",
                        {
                          "bg-yellow-500/15 text-yellow-300": !isClosed,
                          "bg-green-500/15 text-green-300": isWin,
                          "bg-red-500/15 text-red-300": isLoss,
                          "bg-white/10 text-white/70": isBreakeven,
                        }
                      )}
                    >
                      {isClosed
                        ? `${(trade.pnl ?? 0) > 0 ? "+" : ""}${trade.pnl}R`
                        : "Open"}
                    </div>
                  </div>

                  {!!trade.notes.trim() && (
                    <p className="mt-3 text-sm text-white/65 line-clamp-2">
                      {trade.notes}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DayTradesModal;
