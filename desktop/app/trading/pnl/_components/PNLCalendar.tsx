"use client";

import { useMemo, useState } from "react";
import useCalendar from "@/hooks/useCalendar";
import PNLDayCell from "./PNLDayCell";
import CalendarSummary from "./CalendarSummary";
import TradeJournalModal from "./LogTrade";
import DayTradesModal from "./DayTradeModal";
import { TradeFormData } from "@/lib/types";
import { useTradeHistory } from "@/store/tradeHistory/useTradeHistory";
import { useTradeLevel } from "@/store/tradeLevel/useTradeLevel";

const PNLCalendar = () => {
  const {
    days,
    monthLabel,
    prevMonth,
    nextMonth,
    current: currentDate,
  } = useCalendar();

  const {
    tradeHistory: trades,
    addTradeData,
    dispatch,
    closeTrade,
  } = useTradeHistory();
  const { isPending, xp_lvl, increaseTradeLevel } = useTradeLevel();
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTradeId, setSelectedTradeId] = useState<string | null>(null);

  const [isDayTradesModalOpen, setIsDayTradesModalOpen] = useState(false);
  const [selectedDayTrades, setSelectedDayTrades] = useState<TradeFormData[]>(
    []
  );
  const [selectedDayLabel, setSelectedDayLabel] = useState("");

  const openNewTradeModal = (date: Date) => {
    const localDate = new Date(date);
    const yyyy = localDate.getFullYear();
    const mm = String(localDate.getMonth() + 1).padStart(2, "0");
    const dd = String(localDate.getDate()).padStart(2, "0");

    setSelectedDate(`${yyyy}-${mm}-${dd}`);
    setSelectedTradeId(null);
    setIsTradeModalOpen(true);
  };

  const openExistingTradeModal = (tradeId: string) => {
    const existing = trades.find((t) => t.trade_id === tradeId);
    if (!existing) return;

    setSelectedDate(existing.openTime.split("T")[0]);
    setSelectedTradeId(tradeId);
    setIsTradeModalOpen(true);
  };

  const openDayTradesModal = (date: Date) => {
    const localDate = new Date(date);
    const yyyy = localDate.getFullYear();
    const mm = String(localDate.getMonth() + 1).padStart(2, "0");
    const dd = String(localDate.getDate()).padStart(2, "0");
    const dayKey = `${yyyy}-${mm}-${dd}`;

    const matchedTrades = trades.filter(
      (trade) => trade.openTime.split("T")[0] === dayKey
    );

    setSelectedDayTrades(matchedTrades);
    setSelectedDayLabel(
      localDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setIsDayTradesModalOpen(true);
  };

  const handleSaveTrade = (payload: TradeFormData) => {
    console.log(payload);
    if (!payload.closeTime) {
      dispatch(addTradeData(payload));
    } else {
      dispatch(closeTrade(payload));
      dispatch(increaseTradeLevel(Number(xp_lvl + 50)));
    }
  };

  const selectedTrade = useMemo(() => {
    if (!selectedTradeId) return null;
    return trades.find((t) => t.trade_id === selectedTradeId) ?? null;
  }, [selectedTradeId, trades]);

  return (
    <>
      <div className="grid grid-cols-[4fr_1.25fr] gap-4 items-stretch">
        <div className="w-full max-w-[80vw] bg-transparent shadow-md rounded-[0.7vw] p-[1.1vw]">
          <header className="flex justify-between items-center mb-[1.75vw]">
            <div className="flex items-center gap-6">
              <h2 className="text-[1.6vw] font-semibold">{monthLabel}</h2>
            </div>

            <div>
              <button
                onClick={prevMonth}
                className="text-[1.5vw] cursor-pointer transition duration-150 px-[0.8vw] py-[0.4vw] rounded hover:bg-card"
              >
                &lt;
              </button>
              <button
                onClick={nextMonth}
                className="text-[1.5vw] cursor-pointer transition duration-150 px-[0.8vw] py-[0.4vw] rounded hover:bg-card"
              >
                &gt;
              </button>
            </div>
          </header>

          <div className="grid grid-cols-7 mb-[1.5vw] text-[1vw] font-medium">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-center">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 place-items-center gap-1.5">
            {days.map((day) => {
              const dayKey = [
                day.date.getFullYear(),
                String(day.date.getMonth() + 1).padStart(2, "0"),
                String(day.date.getDate()).padStart(2, "0"),
              ].join("-");

              const dayTrades = trades.filter(
                (trade) => trade.openTime.split("T")[0] === dayKey
              );

              return (
                <PNLDayCell
                  key={day.date.toISOString()}
                  day={day}
                  trades={dayTrades}
                  onAddTrade={() => openNewTradeModal(day.date)}
                  onOpenTrade={openExistingTradeModal}
                  onOpenDayTrades={openDayTradesModal}
                />
              );
            })}
          </div>
        </div>

        <CalendarSummary
          days={days}
          monthLabel={monthLabel}
          currentDate={currentDate}
          trades={trades}
        />
      </div>

      {isTradeModalOpen && (
        <TradeJournalModal
          selectedDate={selectedDate}
          existingTrade={selectedTrade}
          onSave={handleSaveTrade}
          onClose={() => {
            setIsTradeModalOpen(false);
            setSelectedDate(null);
            setSelectedTradeId(null);
          }}
        />
      )}

      {isDayTradesModalOpen && (
        <DayTradesModal
          dateLabel={selectedDayLabel}
          trades={selectedDayTrades}
          onClose={() => {
            setIsDayTradesModalOpen(false);
            setSelectedDayTrades([]);
            setSelectedDayLabel("");
          }}
          onOpenTrade={(tradeId) => {
            setIsDayTradesModalOpen(false);
            openExistingTradeModal(tradeId);
          }}
        />
      )}
    </>
  );
};

export default PNLCalendar;
