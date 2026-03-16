"use client";

import { useMemo, useState } from "react";
import useCalendar from "@/hooks/useCalendar";
import PNLDayCell from "./PNLDayCell";
import CalendarSummary from "./CalendarSummary";
import TradeJournalModal, { TradeFormData } from "./LogTrade";
const demoClosedTrades: (TradeFormData & { id: string })[] = [
  {
    id: "trade-1",
    pair: "EURUSD",
    type: "Long",
    openTime: "2026-03-02T09:15",
    closeTime: "2026-03-02T11:40",
    risk: 1,
    notes: "London session continuation after sweep.",
    postNotes: "Followed plan well. Took profit at resistance.",
    tierSetup: "A++",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 125.5,
    setupCriteria: {
      isRefined: true,
      isBelowOrAboveOpeningPrice: true,
      isMssOccured: true,
      isIFVG: true,
      isFVG: true,
      isDisplacement: true,
      isLiquiditySweep: true,
      isPoiMitigated: true,
    },
  },
  {
    id: "trade-2",
    pair: "GBPUSD",
    type: "Short",
    openTime: "2026-03-02T09:15",
    closeTime: "2026-03-03T15:00",
    risk: 1,
    notes: "NY session reversal setup.",
    postNotes: "Entry was okay, exited a bit early.",
    tierSetup: "A",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 78.25,
    setupCriteria: {
      isRefined: true,
      isBelowOrAboveOpeningPrice: true,
      isMssOccured: true,
      isIFVG: true,
      isFVG: false,
      isDisplacement: true,
      isLiquiditySweep: true,
      isPoiMitigated: true,
    },
  },
  {
    id: "trade-3",
    pair: "AUDUSD",
    type: "Long",
    openTime: "2026-03-04T08:20",
    closeTime: "2026-03-04T10:05",
    risk: 1,
    notes: "Asia to London continuation.",
    postNotes: "Good execution, clean target hit.",
    tierSetup: "A++",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 96,
    setupCriteria: {
      isRefined: true,
      isBelowOrAboveOpeningPrice: true,
      isMssOccured: true,
      isIFVG: true,
      isFVG: true,
      isDisplacement: true,
      isLiquiditySweep: true,
      isPoiMitigated: true,
    },
  },
  {
    id: "trade-4",
    pair: "GBPAUD",
    type: "Short",
    openTime: "2026-03-05T14:00",
    closeTime: "2026-03-05T15:10",
    risk: 1,
    notes: "Break and retest short.",
    postNotes: "Stopped out after reclaim.",
    tierSetup: "A",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: -52.5,
    setupCriteria: {
      isRefined: true,
      isBelowOrAboveOpeningPrice: true,
      isMssOccured: true,
      isIFVG: false,
      isFVG: true,
      isDisplacement: true,
      isLiquiditySweep: true,
      isPoiMitigated: true,
    },
  },
  {
    id: "trade-5",
    pair: "EURUSD",
    type: "Short",
    openTime: "2026-03-06T10:30",
    closeTime: "2026-03-06T12:00",
    risk: 1,
    notes: "Liquidity sweep into bearish displacement.",
    postNotes: "Held to target, no issues.",
    tierSetup: "A++",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 140,
    setupCriteria: {
      isRefined: true,
      isBelowOrAboveOpeningPrice: true,
      isMssOccured: true,
      isIFVG: true,
      isFVG: true,
      isDisplacement: true,
      isLiquiditySweep: true,
      isPoiMitigated: true,
    },
  },
  {
    id: "trade-6",
    pair: "GBPUSD",
    type: "Long",
    openTime: "2026-03-07T09:45",
    closeTime: "2026-03-07T10:50",
    risk: 1,
    notes: "Opening drive continuation.",
    postNotes: "Took partials too early but still green.",
    tierSetup: "A",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 64.75,
    setupCriteria: {
      isRefined: true,
      isBelowOrAboveOpeningPrice: true,
      isMssOccured: true,
      isIFVG: true,
      isFVG: false,
      isDisplacement: true,
      isLiquiditySweep: true,
      isPoiMitigated: true,
    },
  },
  {
    id: "trade-7",
    pair: "AUDUSD",
    type: "Short",
    openTime: "2026-03-08T11:20",
    closeTime: "2026-03-08T12:35",
    risk: 1,
    notes: "Failed continuation after mitigation.",
    postNotes: "Small loss, invalidation respected.",
    tierSetup: "A",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: -38.2,
    setupCriteria: {
      isRefined: true,
      isBelowOrAboveOpeningPrice: true,
      isMssOccured: true,
      isIFVG: true,
      isFVG: false,
      isDisplacement: true,
      isLiquiditySweep: true,
      isPoiMitigated: true,
    },
  },
  {
    id: "trade-8",
    pair: "GBPAUD",
    type: "Long",
    openTime: "2026-03-09T08:10",
    closeTime: "2026-03-09T09:25",
    risk: 1,
    notes: "Reversal from POI with displacement.",
    postNotes: "Nice reaction and clean exit.",
    tierSetup: "A++",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 88.4,
    setupCriteria: {
      isRefined: true,
      isBelowOrAboveOpeningPrice: true,
      isMssOccured: true,
      isIFVG: true,
      isFVG: true,
      isDisplacement: true,
      isLiquiditySweep: true,
      isPoiMitigated: true,
    },
  },
  {
    id: "trade-9",
    pair: "EURUSD",
    type: "Long",
    openTime: "2026-03-10T13:40",
    closeTime: "2026-03-10T15:15",
    risk: 1,
    notes: "Midday reclaim long.",
    postNotes: "Could have held longer, but solid execution.",
    tierSetup: "A",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 71.1,
    setupCriteria: {
      isRefined: true,
      isBelowOrAboveOpeningPrice: true,
      isMssOccured: true,
      isIFVG: false,
      isFVG: true,
      isDisplacement: true,
      isLiquiditySweep: true,
      isPoiMitigated: true,
    },
  },
  {
    id: "trade-10",
    pair: "GBPUSD",
    type: "Short",
    openTime: "2026-03-11T10:05",
    closeTime: "2026-03-11T11:20",
    risk: 1,
    notes: "Short after failed breakout.",
    postNotes: "Good entry, target hit fast.",
    tierSetup: "A++",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 118.9,
    setupCriteria: {
      isRefined: true,
      isBelowOrAboveOpeningPrice: true,
      isMssOccured: true,
      isIFVG: true,
      isFVG: true,
      isDisplacement: true,
      isLiquiditySweep: true,
      isPoiMitigated: true,
    },
  },
  {
    id: "trade-11",
    pair: "AUDUSD",
    type: "Long",
    openTime: "2026-03-12T09:00",
    closeTime: "2026-03-12T10:10",
    risk: 1,
    notes: "Continuation from IFVG support.",
    postNotes: "Clean trade, patient hold.",
    tierSetup: "A",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 54.6,
    setupCriteria: {
      isRefined: true,
      isBelowOrAboveOpeningPrice: true,
      isMssOccured: true,
      isIFVG: true,
      isFVG: false,
      isDisplacement: true,
      isLiquiditySweep: true,
      isPoiMitigated: true,
    },
  },
  {
    id: "trade-12",
    pair: "GBPAUD",
    type: "Short",
    openTime: "2026-03-13T14:25",
    closeTime: "2026-03-13T16:00",
    risk: 1,
    notes: "Late session short from premium.",
    postNotes: "Took a loss after reversal.",
    tierSetup: "A",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: -67.3,
    setupCriteria: {
      isRefined: true,
      isBelowOrAboveOpeningPrice: true,
      isMssOccured: true,
      isIFVG: false,
      isFVG: true,
      isDisplacement: true,
      isLiquiditySweep: true,
      isPoiMitigated: true,
    },
  },
  {
    id: "trade-13",
    pair: "EURUSD",
    type: "Short",
    openTime: "2026-03-14T08:50",
    closeTime: "2026-03-14T09:40",
    risk: 1,
    notes: "Morning fade after liquidity run.",
    postNotes: "Quick and clean scalp.",
    tierSetup: "A++",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 82,
    setupCriteria: {
      isRefined: true,
      isBelowOrAboveOpeningPrice: true,
      isMssOccured: true,
      isIFVG: true,
      isFVG: true,
      isDisplacement: true,
      isLiquiditySweep: true,
      isPoiMitigated: true,
    },
  },
  {
    id: "trade-14",
    pair: "GBPUSD",
    type: "Long",
    openTime: "2026-03-15T11:10",
    closeTime: "2026-03-15T13:05",
    risk: 1,
    notes: "Pullback entry in bullish structure.",
    postNotes: "Nice runner, managed well.",
    tierSetup: "A++",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 132.4,
    setupCriteria: {
      isRefined: true,
      isBelowOrAboveOpeningPrice: true,
      isMssOccured: true,
      isIFVG: true,
      isFVG: true,
      isDisplacement: true,
      isLiquiditySweep: true,
      isPoiMitigated: true,
    },
  },
];
const PNLCalendar = () => {
  const {
    days,
    monthLabel,
    prevMonth,
    nextMonth,
    current: currentDate,
  } = useCalendar();

  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTradeId, setSelectedTradeId] = useState<string | null>(null);

  const [trades, setTrades] =
    useState<(TradeFormData & { id: string })[]>(demoClosedTrades);

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
    const existing = trades.find((t) => t.id === tradeId);
    if (!existing) return;

    setSelectedDate(existing.openTime.split("T")[0]);
    setSelectedTradeId(tradeId);
    setIsTradeModalOpen(true);
  };

  const handleSaveTrade = (payload: TradeFormData & { id?: string }) => {
    if (payload.id) {
      setTrades((prev) =>
        prev.map((trade) =>
          trade.id === payload.id
            ? { ...trade, ...payload, id: trade.id }
            : trade
        )
      );
      return;
    }

    const newTrade = {
      ...payload,
      id: crypto.randomUUID(),
    };

    setTrades((prev) => [...prev, newTrade]);
  };

  const selectedTrade = useMemo(() => {
    if (!selectedTradeId) return null;
    return trades.find((t) => t.id === selectedTradeId) ?? null;
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
                />
              );
            })}
          </div>
        </div>

        <CalendarSummary
          days={days}
          monthLabel={monthLabel}
          currentDate={currentDate}
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
    </>
  );
};

export default PNLCalendar;
