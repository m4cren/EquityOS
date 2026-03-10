"use client";
import { ChevronRight, Funnel } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type SetupCriteriaTypes = {
  isRefined: boolean;
  isBelowOrAboveOpeningPrice: boolean;
  isMssOccured: boolean;
  isIFVG: boolean;
  isFVG: boolean;
  isDisplacement: boolean;
  isLiquiditySweep: boolean;
  isPoiMitigated: boolean;
};

type TradeTypes = {
  pair: string | null;
  isMaintenance: boolean; //if true, null the others
  type: "Short" | "Long" | null;
  openTime: string | null;
  closeTime: string | "Open" | null;
  tierSetup: "A+" | "A++" | null;
  risk: number | null;
  pnl: number | "Open" | null;
  preSetupImg: string[] | null;
  postSetupImg: string | null;
  notes: string | null;
  postNotes: string | null;

  setupCriteria: SetupCriteriaTypes;
};
const trades: TradeTypes[] = [
  {
    pair: "EUR/USD",
    isMaintenance: false,
    type: "Short",
    openTime: "2026-03-10 19:39",
    closeTime: "2026-03-10 20:21",
    tierSetup: "A++",
    risk: 1,
    pnl: 3.78,
    preSetupImg: [
      "https://www.tradingview.com/x/7keBknFY/",
      "https://www.tradingview.com/x/7keBknFY/",
    ],
    postSetupImg: "https://www.tradingview.com/x/7keBknFY/",
    postNotes: "Trade respected HTF resistance and reached TP cleanly.",
    notes: "Liquidity sweep above London high then MSS and displacement.",

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
    pair: "GBP/USD",
    isMaintenance: false,
    type: "Long",
    openTime: "2026-03-09 14:10",
    closeTime: "2026-03-09 15:02",
    tierSetup: "A+",
    risk: 1,
    pnl: 1.95,
    preSetupImg: [
      "https://www.tradingview.com/x/7keBknFY/",
      "https://www.tradingview.com/x/7keBknFY/",
    ],
    postSetupImg: "https://www.tradingview.com/x/7keBknFY/",
    postNotes: "Trade respected HTF resistance and reached TP cleanly.",
    notes: "NY session breakout with displacement and FVG entry.",

    setupCriteria: {
      isRefined: false,
      isBelowOrAboveOpeningPrice: true,
      isMssOccured: true,
      isIFVG: false,
      isFVG: true,
      isDisplacement: true,
      isLiquiditySweep: false,
      isPoiMitigated: true,
    },
  },

  {
    pair: "USD/JPY",
    isMaintenance: false,
    type: "Long",
    openTime: "2026-03-10 07:12",
    closeTime: "Open",
    postNotes: "Trade respected HTF resistance and reached TP cleanly.",
    tierSetup: "A++",
    risk: 0.5,
    pnl: "Open",
    preSetupImg: [
      "https://www.tradingview.com/x/7keBknFY/",
      "https://www.tradingview.com/x/7keBknFY/",
    ],
    postSetupImg: null,
    notes: "Asian session continuation with liquidity sweep.",

    setupCriteria: {
      isRefined: true,
      isBelowOrAboveOpeningPrice: true,
      isMssOccured: false,
      isIFVG: true,
      isFVG: false,
      isDisplacement: true,
      isLiquiditySweep: true,
      isPoiMitigated: false,
    },
  },

  {
    pair: null,
    isMaintenance: true,
    type: null,
    openTime: null,
    closeTime: null,
    postNotes: "Trade respected HTF resistance and reached TP cleanly.",
    tierSetup: null,
    risk: null,
    pnl: null,
    preSetupImg: [],
    postSetupImg: null,
    notes: null,

    setupCriteria: {
      isRefined: false,
      isBelowOrAboveOpeningPrice: false,
      isMssOccured: false,
      isIFVG: false,
      isFVG: false,
      isDisplacement: false,
      isLiquiditySweep: false,
      isPoiMitigated: false,
    },
  },
];
const formatDateTime = (dateStr: string | null) => {
  if (!dateStr) return "-";

  const date = new Date(dateStr);

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // ito ang nagtatanggal ng military time
  });
};
const getTradeDuration = (
  open: string | null,
  close: string | "Open" | null
) => {
  if (!open) return "-";

  const openDate = new Date(open);

  let closeDate: Date;

  if (close === "Open") {
    closeDate = new Date();
  } else if (close) {
    closeDate = new Date(close);
  } else {
    return "-";
  }

  const diffMs = closeDate.getTime() - openDate.getTime();
  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const remainingMin = minutes % 60;

  return `${hours}h ${remainingMin}m`;
};
const Journal = () => {
  const [selectedTrade, setSelectedTrade] = useState<TradeTypes | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  return (
    <div>
      <div className="flex justify-between border-b-2 border-white/10 pb-6">
        <h5 className="text-2xl font-semibold">Trading Journal</h5>
        <div className="flex gap-4">
          <button className="text-xs bg-card px-4 rounded-md text-white/75 font-medium flex items-center gap-2">
            <input type="checkbox" />
            Profitable trades only
          </button>
          <button>
            <Funnel />
          </button>
        </div>
      </div>
      <table className="w-full text-sm text-left border-separate border-spacing-y-2">
        <thead className="text-white/60">
          <tr>
            <th className="px-4 py-2 font-medium">Symbol</th>
            <th className="px-4 py-2 font-medium">Type</th>
            <th className="px-4 py-2 font-medium">Duration</th>

            <th className="px-4 py-2 font-medium">Tier Setup</th>
            <th className="px-4 py-2 font-medium">Risk</th>
            <th className="px-4 py-2 font-medium">PnL</th>
          </tr>
        </thead>

        <tbody>
          {trades.map((trade, i) => {
            if (trade.isMaintenance) {
              return (
                <tr key={i} className="bg-yellow-500/10">
                  <td
                    colSpan={7}
                    className="px-4 py-3 text-center text-yellow-400"
                  >
                    Trade Maintenance
                  </td>
                </tr>
              );
            }

            return (
              <tr
                key={i}
                onClick={() => setSelectedTrade(trade)}
                className="bg-white/5 hover:bg-white/10 transition cursor-pointer"
              >
                <td className="px-4 py-3 font-medium">{trade.pair}</td>

                <td
                  className={`px-4 py-3 ${
                    trade.type === "Short" ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {trade.type}
                </td>

                <td className="px-4 py-3 text-white/70">
                  {getTradeDuration(trade.openTime, trade.closeTime)}
                </td>
                <td className="px-4 py-3">
                  {trade.tierSetup && (
                    <span className="px-2 py-1 text-xs rounded bg-blue-500/20 text-blue-300">
                      {trade.tierSetup}
                    </span>
                  )}
                </td>

                <td className="px-4 py-3">
                  {trade.risk ? `${trade.risk}%` : "-"}
                </td>

                <td
                  className={`px-4 py-3 font-medium ${
                    typeof trade.pnl === "number"
                      ? trade.pnl > 0
                        ? "text-green-400"
                        : "text-red-400"
                      : "text-white/60"
                  }`}
                >
                  {typeof trade.pnl === "number"
                    ? `+${trade.pnl}R`
                    : trade.pnl ?? "-"}
                </td>

                <td className="px-4 py-3 text-center">
                  <button className="text-white/50 hover:text-white transition">
                    <ChevronRight size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {previewImg && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]"
          onClick={() => setPreviewImg(null)}
        >
          <img
            src={previewImg}
            className="max-w-[90vw] max-h-[90vh] rounded-lg"
          />
        </div>
      )}
      {selectedTrade && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedTrade(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-card w-[950px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-8 space-y-8"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <h3 className="text-2xl font-semibold">{selectedTrade.pair}</h3>
                <p className="text-xs text-white/50">Trade Details</p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  selectedTrade.type === "Short"
                    ? "bg-red-500/20 text-red-300"
                    : "bg-green-500/20 text-green-300"
                }`}
              >
                {selectedTrade.type}
              </span>
            </div>

            {/* TRADE INFO */}
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
                  value: getTradeDuration(
                    selectedTrade.openTime,
                    selectedTrade.closeTime
                  ),
                },
                { label: "Risk", value: `${selectedTrade.risk}%` },
                { label: "Tier Setup", value: selectedTrade.tierSetup },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs text-white/50 mb-1">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              ))}

              {/* PnL */}
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-xs text-white/50 mb-1">PnL</p>
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
                    ? `+${selectedTrade.pnl}R`
                    : selectedTrade.pnl}
                </p>
              </div>
            </div>

            {/* SETUP CRITERIA */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Setup Criteria</h4>

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
                  [
                    "Liquidity sweep",
                    selectedTrade.setupCriteria.isLiquiditySweep,
                  ],
                  ["POI mitigated", selectedTrade.setupCriteria.isPoiMitigated],
                ].map(([label, checked], i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                      checked ? "bg-green-500/10 text-green-300" : "bg-white/5"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked as boolean}
                      readOnly
                    />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* PRE SETUP IMAGES */}
            {selectedTrade.preSetupImg &&
              selectedTrade.preSetupImg.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-4">Pre Setup</h4>

                  <div className="grid grid-cols-2 gap-4">
                    {selectedTrade.preSetupImg.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        className="rounded-xl border border-white/10 hover:border-white/30 cursor-zoom-in transition"
                        onClick={() => setPreviewImg(img)}
                      />
                    ))}
                  </div>
                </div>
              )}

            {/* NOTES */}
            {selectedTrade.notes && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Notes</h4>
                <div className="bg-white/5 rounded-lg p-4 text-sm text-white/80">
                  {selectedTrade.notes}
                </div>
              </div>
            )}

            {/* POST SETUP */}
            {selectedTrade.postSetupImg && (
              <div>
                <h4 className="text-lg font-semibold mb-4">Post Setup</h4>

                <img
                  src={selectedTrade.postSetupImg}
                  className="rounded-xl border border-white/10 hover:border-white/30 cursor-zoom-in transition"
                  onClick={() => setPreviewImg(selectedTrade.postSetupImg!)}
                />
              </div>
            )}

            {/* POST NOTES */}
            {selectedTrade.postNotes && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Post Trade Notes</h4>
                <div className="bg-white/5 rounded-lg p-4 text-sm text-white/80">
                  {selectedTrade.postNotes}
                </div>
              </div>
            )}

            {/* CLOSE BUTTON */}
            <div className="flex justify-end pt-6 border-t border-white/10">
              <button
                onClick={() => setSelectedTrade(null)}
                className="px-5 py-2 rounded-md bg-white/10 hover:bg-white/20 text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;
