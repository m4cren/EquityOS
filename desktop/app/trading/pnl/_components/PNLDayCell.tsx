import { Day } from "@/hooks/useCalendar";
import classNames from "classnames";
import { Plus } from "lucide-react";
import React from "react";
import type { TradeFormData } from "./LogTrade";

type TradeItem = TradeFormData & { id: string };

type Props = {
  day: Day;
  trades: TradeItem[];
  onAddTrade: () => void;
  onOpenTrade: (tradeId: string) => void;
  onOpenDayTrades: (date: Date) => void;
};

const PNLDayCell: React.FC<Props> = ({
  day,
  trades = [],
  onAddTrade,
  onOpenTrade,
  onOpenDayTrades,
}) => {
  const isToday = day.isToday;
  const isCurrentMonth = day.isCurrentMonth;
  const hasTrades = trades.length > 0;

  const handleCellClick = () => {
    if (!isCurrentMonth || !hasTrades) return;
    onOpenDayTrades(day.date);
  };

  const handleCellKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isCurrentMonth || !hasTrades) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenDayTrades(day.date);
    }
  };

  return (
    <div
      role={hasTrades && isCurrentMonth ? "button" : undefined}
      tabIndex={hasTrades && isCurrentMonth ? 0 : -1}
      onClick={handleCellClick}
      onKeyDown={handleCellKeyDown}
      className={classNames(
        "group relative w-full min-h-28 rounded-xl border transition-all duration-200 overflow-hidden",
        {
          "bg-card border-card shadow-[0_0_0_1px_rgba(255,255,255,0.04)]":
            isToday,
          "bg-transparent border-white/10 hover:border-white/20 hover:bg-white/[0.03]":
            !isToday,
          "opacity-45": !isCurrentMonth,
          "cursor-pointer": hasTrades && isCurrentMonth,
        }
      )}
    >
      {isCurrentMonth && isToday && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddTrade();
          }}
          className="absolute top-2 right-2 z-10 flex items-center justify-center rounded-lg bg-flame/25 hover:bg-flame/40 border border-flame/20 hover:border-flame/40 backdrop-blur-sm p-1.5 transition-all duration-200 shadow-xl"
        >
          <Plus size={15} strokeWidth={2.5} className="text-white" />
        </button>
      )}

      <div className="flex h-full flex-col p-3">
        <div className="flex items-start justify-between mb-2">
          <span
            className={classNames(
              "text-[1vw] leading-none transition-colors duration-200",
              {
                "text-white font-semibold": isToday,
                "text-[#d4d4d4]": !isToday && isCurrentMonth,
                "text-[#d4d4d455]": !isCurrentMonth,
              }
            )}
          >
            {day.date.getDate()}
          </span>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto pr-1">
          {trades.slice(0, 3).map((trade) => {
            const isClosed = !!trade.closeTime;
            const isWin = isClosed && (trade.pnl ?? 0) > 0;
            const isLoss = isClosed && (trade.pnl ?? 0) < 0;
            const isBreakeven = isClosed && (trade.pnl ?? 0) === 0;

            return (
              <button
                key={trade.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenTrade(trade.id);
                }}
                className={classNames(
                  "w-full flex items-center justify-between rounded-md px-2 py-1 text-[0.72vw] transition",
                  {
                    "bg-yellow-500/15 text-yellow-300 hover:bg-yellow-500/20":
                      !isClosed,
                    "bg-green-500/15 text-green-300 hover:bg-green-500/20":
                      isWin,
                    "bg-red-500/15 text-red-300 hover:bg-red-500/20": isLoss,
                    "bg-white/10 text-white/70 hover:bg-white/15": isBreakeven,
                  }
                )}
              >
                <span className="font-medium tracking-wide">
                  {trade.pair || "PAIR"}
                </span>

                <span className="font-semibold tabular-nums">
                  {isClosed
                    ? `${trade.pnl! > 0 ? "+" : ""}${trade.pnl}R`
                    : "Open"}
                </span>
              </button>
            );
          })}

          {trades.length > 3 && (
            <div className="text-[0.65vw] text-white/35 px-1">
              +{trades.length - 3} more
            </div>
          )}
        </div>

        <div className="mt-2 flex items-end justify-between">
          <div className="text-[0.72vw] text-white/35">
            {isToday ? "Today" : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PNLDayCell;
