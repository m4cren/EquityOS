"use client";

import { useMemo, useState } from "react";
import useCalendar from "@/hooks/useCalendar";
import PNLDayCell from "./PNLDayCell";
import CalendarSummary from "./CalendarSummary";
import TradeJournalModal, { TradeFormData } from "./LogTrade";
import DayTradesModal from "./DayTradeModal";
const demoClosedTrades: (TradeFormData & { id: string })[] = [
  {
    id: "trade-jan-1",
    pair: "EURUSD",
    type: "Long",
    openTime: "2026-01-06T09:10",
    closeTime: "2026-01-06T10:35",
    risk: 1,
    notes: "London continuation from discount.",
    postNotes: "Clean continuation and target hit.",
    tierSetup: "A++",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 1.8,
    pnl_in_usd: 180,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-jan-2",
    pair: "GBPUSD",
    type: "Short",
    openTime: "2026-01-08T13:20",
    closeTime: "2026-01-08T14:25",
    risk: 1,
    notes: "NY reversal short from premium.",
    postNotes: "Entry good, partial exit early.",
    tierSetup: "A",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 1.1,
    pnl_in_usd: 110,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-jan-3",
    pair: "AUDUSD",
    type: "Long",
    openTime: "2026-01-10T08:40",
    closeTime: "2026-01-10T09:30",
    risk: 1,
    notes: "Asia continuation after sweep.",
    postNotes: "Followed plan, took full target.",
    tierSetup: "A++",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 1.4,
    pnl_in_usd: 140,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-jan-4",
    pair: "GBPAUD",
    type: "Short",
    openTime: "2026-01-14T14:05",
    closeTime: "2026-01-14T15:15",
    risk: 1,
    notes: "Break and retest short.",
    postNotes: "Stopped out on reclaim.",
    tierSetup: "A",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: -0.9,
    pnl_in_usd: -90,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-jan-5",
    pair: "EURUSD",
    type: "Short",
    openTime: "2026-01-20T10:00",
    closeTime: "2026-01-20T11:50",
    risk: 1,
    notes: "Liquidity sweep then bearish displacement.",
    postNotes: "Good hold to full TP.",
    tierSetup: "A++",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 2.2,
    pnl_in_usd: 220,
    accounts: ["m4cren"],
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
    id: "trade-feb-1",
    pair: "EURUSD",
    type: "Long",
    openTime: "2026-02-02T09:15",
    closeTime: "2026-02-02T11:40",
    risk: 1,
    notes: "London session continuation after sweep.",
    postNotes: "Followed plan well. Took profit at resistance.",
    tierSetup: "A++",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 1.25,
    pnl_in_usd: 125.5,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-feb-2",
    pair: "GBPUSD",
    type: "Short",
    openTime: "2026-02-05T10:15",
    closeTime: "2026-02-05T12:00",
    risk: 1,
    notes: "NY reversal setup.",
    postNotes: "Good reaction, but exited earlier than planned.",
    tierSetup: "A",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 0.8,
    pnl_in_usd: 78.25,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-feb-3",
    pair: "AUDUSD",
    type: "Long",
    openTime: "2026-02-09T08:20",
    closeTime: "2026-02-09T10:05",
    risk: 1,
    notes: "Asia to London continuation.",
    postNotes: "Clean execution and target hit.",
    tierSetup: "A++",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 1.0,
    pnl_in_usd: 96,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-feb-4",
    pair: "GBPAUD",
    type: "Short",
    openTime: "2026-02-12T14:00",
    closeTime: "2026-02-12T15:10",
    risk: 1,
    notes: "Break and retest short.",
    postNotes: "Stopped out after reclaim.",
    tierSetup: "A",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: -0.5,
    pnl_in_usd: -52.5,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-feb-5",
    pair: "EURUSD",
    type: "Short",
    openTime: "2026-02-18T10:30",
    closeTime: "2026-02-18T12:00",
    risk: 1,
    notes: "Liquidity sweep into bearish displacement.",
    postNotes: "Held to target, no issues.",
    tierSetup: "A++",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 1.4,
    pnl_in_usd: 140,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-feb-6",
    pair: "GBPUSD",
    type: "Long",
    openTime: "2026-02-21T09:45",
    closeTime: "2026-02-21T10:50",
    risk: 1,
    notes: "Opening drive continuation.",
    postNotes: "Took partials too early but still green.",
    tierSetup: "A",
    preSetupImg: ["https://www.tradingview.com/x/OFAwlIUP/"],
    postSetupImg: "https://www.tradingview.com/x/OFAwlIUP/",
    pnl: 0.65,
    pnl_in_usd: 64.75,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-mar-1",
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
    pnl: 0.8,
    pnl_in_usd: 78.25,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-mar-2",
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
    pnl: 1.0,
    pnl_in_usd: 96,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-mar-3",
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
    pnl: -0.5,
    pnl_in_usd: -52.5,
    accounts: ["m4cren"],
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
    id: "trade-mar-4",
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
    pnl: 1.4,
    pnl_in_usd: 140,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-mar-5",
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
    pnl: 0.65,
    pnl_in_usd: 64.75,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-mar-6",
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
    pnl: -0.4,
    pnl_in_usd: -38.2,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-mar-7",
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
    pnl: 0.9,
    pnl_in_usd: 88.4,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-mar-8",
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
    pnl: 0.7,
    pnl_in_usd: 71.1,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-mar-9",
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
    pnl: 1.2,
    pnl_in_usd: 118.9,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-mar-10",
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
    pnl: 0.55,
    pnl_in_usd: 54.6,
    accounts: ["m4cren"],
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
    id: "trade-mar-11",
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
    pnl: -0.7,
    pnl_in_usd: -67.3,
    accounts: ["Funded_m4cren", "m4cren"],
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
    id: "trade-mar-12",
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
    pnl: 0.8,
    pnl_in_usd: 82,
    accounts: ["Funded_m4cren"],
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
    id: "trade-mar-13",
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
    pnl: 1.3,
    pnl_in_usd: 132.4,
    accounts: ["Funded_m4cren", "m4cren"],
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

  const [isDayTradesModalOpen, setIsDayTradesModalOpen] = useState(false);
  const [selectedDayTrades, setSelectedDayTrades] = useState<
    (TradeFormData & { id: string })[]
  >([]);
  const [selectedDayLabel, setSelectedDayLabel] = useState("");

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
