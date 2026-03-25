"use client";

import { Pair, SetupCriteria, TradeFormData } from "@/lib/types";
import { Calendar, Clock } from "lucide-react";
import { useMemo, useState } from "react";

const ACCOUNTS_STATIC = ["m4cren", "Funded_m4cren"] as const;

type Props = {
  onClose: () => void;
  onSave: (trade: TradeFormData & { id?: string }) => void;
  selectedDate: string | null;
  existingTrade?: (TradeFormData & { id: string }) | null;
};

const defaultCriteria: SetupCriteria = {
  isRefined: false,
  isBelowOrAboveOpeningPrice: false,
  isMssOccured: false,
  isIFVG: false,
  isFVG: false,
  isDisplacement: false,
  isLiquiditySweep: false,
  isPoiMitigated: false,
};

const criteriaList: { key: keyof SetupCriteria; label: string }[] = [
  { key: "isRefined", label: "Refined entry" },
  { key: "isBelowOrAboveOpeningPrice", label: "Above / Below opening price" },
  { key: "isMssOccured", label: "MSS occurred" },
  { key: "isIFVG", label: "IFVG" },
  { key: "isFVG", label: "FVG" },
  { key: "isDisplacement", label: "Displacement" },
  { key: "isLiquiditySweep", label: "Liquidity sweep" },
  { key: "isPoiMitigated", label: "POI mitigated" },
];

const PAIRS: Pair[] = ["EURUSD", "AUDUSD", "GBPUSD"];

const getLocalDateString = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().split("T")[0];
};

const getNowLocalTime = () => {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
};

const getNowLocalDateTime = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
};

const getTradeDuration = (openTime: string, closeTime: string | null) => {
  if (!openTime || !closeTime) return "Open";

  const start = new Date(openTime).getTime();
  const end = new Date(closeTime).getTime();

  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return "—";

  const diffMs = end - start;
  const totalMinutes = Math.floor(diffMs / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
};

const formatDateTime = (value: string | null) => {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const createDefaultTrade = (selectedDate?: string | null): TradeFormData => ({
  pair: "",
  type: "Long",
  openTime: `${selectedDate || getLocalDateString()}T${getNowLocalTime()}`,
  closeTime: null,
  risk: 1,
  notes: "",
  postNotes: "",
  tierSetup: "",
  preSetupImg: [],
  postSetupImg: null,
  pnl: null,
  setupCriteria: { ...defaultCriteria },
  accounts: [],
  pnl_in_usd: 0,
});

export default function TradeJournalModal({
  onClose,
  onSave,
  selectedDate,
  existingTrade,
}: Props) {
  const [trade, setTrade] = useState<TradeFormData>(() =>
    existingTrade
      ? {
          ...existingTrade,
          preSetupImg: [...existingTrade.preSetupImg],
          setupCriteria: { ...existingTrade.setupCriteria },
          accounts: [...existingTrade.accounts],
        }
      : createDefaultTrade(selectedDate)
  );

  const [errors, setErrors] = useState<string[]>([]);
  const [preImgInput, setPreImgInput] = useState("");
  const [postImgInput, setPostImgInput] = useState(
    existingTrade?.postSetupImg || ""
  );

  const checkedCount = useMemo(() => {
    return Object.values(trade.setupCriteria).filter(Boolean).length;
  }, [trade.setupCriteria]);

  const missingCount = useMemo(() => {
    return criteriaList.length - checkedCount;
  }, [checkedCount]);

  const setupGrade = useMemo(() => {
    if (missingCount === 0) return "A++";
    if (missingCount === 1) return "A";
    return "Invalid";
  }, [missingCount]);

  const canPassSetup = missingCount <= 1;

  const isExistingTrade = !!existingTrade;
  const isClosedTrade = !!trade.closeTime;
  const shouldShowCloseSection = isExistingTrade && !isClosedTrade;
  const shouldLockEntryFields = isExistingTrade;
  const shouldLockAllFields = isClosedTrade;

  const tradeStatus = isClosedTrade ? "Recorded" : "Open";
  const tradeDuration = getTradeDuration(trade.openTime, trade.closeTime);

  const effectiveCloseTime =
    trade.closeTime || (shouldShowCloseSection ? getNowLocalDateTime() : null);

  const handleCriteriaChange = (key: keyof SetupCriteria) => {
    if (shouldLockEntryFields) return;

    setTrade((prev) => ({
      ...prev,
      setupCriteria: {
        ...prev.setupCriteria,
        [key]: !prev.setupCriteria[key],
      },
    }));
  };

  const handleAccountToggle = (account: string) => {
    if (shouldLockEntryFields) return;

    setTrade((prev) => {
      const exists = prev.accounts.includes(account);

      return {
        ...prev,
        accounts: exists
          ? prev.accounts.filter((item) => item !== account)
          : [...prev.accounts, account],
      };
    });
  };

  const handleInputChange = <
    K extends keyof Omit<
      TradeFormData,
      "setupCriteria" | "preSetupImg" | "accounts"
    >
  >(
    key: K,
    value: TradeFormData[K]
  ) => {
    setTrade((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddPreImage = () => {
    if (shouldLockEntryFields) return;

    const url = preImgInput.trim();
    if (!url) return;

    setTrade((prev) => ({
      ...prev,
      preSetupImg: [...prev.preSetupImg, url],
    }));
    setPreImgInput("");
  };

  const removePreImage = (index: number) => {
    if (shouldLockEntryFields) return;

    setTrade((prev) => ({
      ...prev,
      preSetupImg: prev.preSetupImg.filter((_, i) => i !== index),
    }));
  };

  const handleAddPostImage = () => {
    if (shouldLockAllFields) return;

    const url = postImgInput.trim();
    if (!url) return;
    handleInputChange("postSetupImg", url);
  };

  const removePostImage = () => {
    if (shouldLockAllFields) return;

    handleInputChange("postSetupImg", null);
    setPostImgInput("");
  };

  const canSaveOpenTrade =
    trade.accounts.length > 0 &&
    !!trade.pair.trim() &&
    !!trade.openTime &&
    !!trade.risk &&
    trade.risk > 0 &&
    canPassSetup;

  const canSaveClosedTrade =
    canSaveOpenTrade &&
    !!effectiveCloseTime &&
    !!trade.postNotes.trim() &&
    !!trade.postSetupImg &&
    trade.pnl !== null &&
    (() => {
      const open = new Date(trade.openTime).getTime();
      const close = new Date(effectiveCloseTime).getTime();
      return !Number.isNaN(open) && !Number.isNaN(close) && close >= open;
    })();

  const isSaveDisabled = isClosedTrade
    ? true
    : shouldShowCloseSection
    ? !canSaveClosedTrade
    : !canSaveOpenTrade;

  const validateTrade = () => {
    const nextErrors: string[] = [];

    if (trade.accounts.length === 0) {
      nextErrors.push("At least one account is required.");
    }
    if (!trade.pair.trim()) nextErrors.push("Pair is required.");
    if (!trade.openTime) nextErrors.push("Open time is required.");
    if (!trade.risk || trade.risk <= 0) {
      nextErrors.push("Risk must be greater than 0.");
    }

    if (!canPassSetup) {
      nextErrors.push(
        "At least 7 of 8 setup criteria must be met. Two missing criteria is not allowed."
      );
    }

    if (shouldShowCloseSection) {
      const closeTimeToUse = trade.closeTime || effectiveCloseTime;

      if (!closeTimeToUse) {
        nextErrors.push("Closing time is required to close the trade.");
      }
      if (trade.pnl === null) {
        nextErrors.push("PnL is required to close the trade.");
      }
      if (!trade.postNotes.trim()) {
        nextErrors.push("Post analysis is required to close the trade.");
      }
      if (!trade.postSetupImg) {
        nextErrors.push("Post setup image is required to close the trade.");
      }

      if (closeTimeToUse) {
        const open = new Date(trade.openTime).getTime();
        const close = new Date(closeTimeToUse).getTime();

        if (!Number.isNaN(open) && !Number.isNaN(close) && close < open) {
          nextErrors.push("Closing time cannot be earlier than open time.");
        }
      }
    }

    setErrors(nextErrors);
    return nextErrors.length === 0;
  };

  const handleReset = () => {
    if (isClosedTrade) return;

    const nextTrade = existingTrade
      ? {
          ...existingTrade,
          preSetupImg: [...existingTrade.preSetupImg],
          setupCriteria: { ...existingTrade.setupCriteria },
          accounts: [...existingTrade.accounts],
        }
      : createDefaultTrade(selectedDate);

    setTrade(nextTrade);
    setPreImgInput("");
    setPostImgInput(nextTrade.postSetupImg || "");
    setErrors([]);
  };

  const handleSave = () => {
    if (!validateTrade()) return;

    const payload = {
      ...trade,
      closeTime: shouldShowCloseSection
        ? trade.closeTime || effectiveCloseTime
        : trade.closeTime,
      tierSetup: setupGrade,
    };

    onSave(existingTrade ? { ...payload, id: existingTrade.id } : payload);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card w-full max-w-[950px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-8 space-y-8"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-2xl font-semibold">
              {existingTrade ? "Update Trade" : "Trade Entry"}
            </h2>
            <p className="text-sm text-white/50">
              Save open trades or record completed trades with post analysis.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white/10 px-4 py-1 text-sm">
              Setup Grade:{" "}
              <span
                className={
                  setupGrade === "A++"
                    ? "text-green-400"
                    : setupGrade === "A"
                    ? "text-yellow-400"
                    : "text-red-400"
                }
              >
                {setupGrade}
              </span>
            </span>

            <span
              className={`rounded-full px-4 py-1 text-sm ${
                tradeStatus === "Recorded"
                  ? "bg-green-500/20 text-green-300"
                  : "bg-yellow-500/20 text-yellow-300"
              }`}
            >
              {tradeStatus}
            </span>

            <button
              onClick={onClose}
              className="rounded-md bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
            >
              Close
            </button>
          </div>
        </div>

        {isClosedTrade && (
          <>
            <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-green-300">
                  Closed Trade
                </h3>
                <span className="text-sm text-green-200">
                  Duration: {tradeDuration}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="rounded-lg bg-black/20 p-3">
                  <p className="mb-2 text-xs text-white/50">Accounts</p>

                  {trade.accounts.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {trade.accounts.map((account) => (
                        <span
                          key={account}
                          className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/90"
                        >
                          {account}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-white/40">—</p>
                  )}
                </div>

                <div className="rounded-lg bg-black/20 p-3">
                  <p className="mb-1 text-xs text-white/50">Closed At</p>
                  <p className="text-sm text-white">
                    {formatDateTime(trade.closeTime)}
                  </p>
                </div>

                <div className="rounded-lg bg-black/20 p-3">
                  <p className="mb-1 text-xs text-white/50">PnL</p>
                  <p
                    className={`text-sm font-medium ${
                      (trade.pnl ?? 0) > 0
                        ? "text-green-300"
                        : (trade.pnl ?? 0) < 0
                        ? "text-red-300"
                        : "text-white"
                    }`}
                  >
                    {trade.pnl ?? "—"}
                  </p>
                </div>

                <div className="rounded-lg bg-black/20 p-3">
                  <p className="mb-1 text-xs text-white/50">PnL in USD</p>
                  <p className="text-sm text-white">{trade.pnl_in_usd}</p>
                </div>
              </div>

              {trade.preSetupImg.length > 0 && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Pre Setup Images
                  </h3>
                  <div className="space-y-4">
                    {trade.preSetupImg.map((img, index) => (
                      <div key={index}>
                        <img
                          src={img}
                          alt={`Pre setup ${index + 1}`}
                          className="rounded-xl border border-white/10"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!!trade.notes.trim() && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Pre-Trade Notes
                  </h3>
                  <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm whitespace-pre-wrap">
                    {trade.notes}
                  </div>
                </div>
              )}

              {trade.postSetupImg && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Post Setup Image
                  </h3>
                  <img
                    src={trade.postSetupImg}
                    alt="Post setup"
                    className="rounded-xl border border-white/10"
                  />
                </div>
              )}

              {!!trade.postNotes.trim() && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Post Analysis</h3>
                  <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm whitespace-pre-wrap">
                    {trade.postNotes}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <div className="space-y-2">
          <label className="text-xs text-white/50">Accounts</label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ACCOUNTS_STATIC.map((account) => {
              const checked = trade.accounts.includes(account);

              return (
                <label
                  key={account}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 border transition ${
                    checked
                      ? "border-green-500/30 bg-green-500/10 text-green-300"
                      : "border-white/10 bg-white/5"
                  } ${
                    shouldLockEntryFields
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={shouldLockEntryFields}
                    onChange={() => handleAccountToggle(account)}
                  />
                  <span>{account}</span>
                </label>
              );
            })}
          </div>

          {trade.accounts.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {trade.accounts.map((account) => (
                <span
                  key={account}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                >
                  {account}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs text-white/50">Pair</label>
            <select
              value={trade.pair}
              disabled={shouldLockEntryFields}
              onChange={(e) =>
                handleInputChange("pair", e.target.value as Pair)
              }
              className="w-full rounded-lg bg-white/5 px-4 py-3 outline-none border border-white/10 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <option value="" className="bg-neutral-900 text-white/50">
                Select pair
              </option>
              {PAIRS.map((pair) => (
                <option key={pair} value={pair} className="bg-neutral-900">
                  {pair}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-white/50">Type</label>
            <select
              value={trade.type}
              disabled={shouldLockEntryFields}
              onChange={(e) =>
                handleInputChange("type", e.target.value as "Long" | "Short")
              }
              className="w-full rounded-lg bg-white/5 px-4 py-3 outline-none border border-white/10 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <option value="Long" className="bg-neutral-900">
                Long
              </option>
              <option value="Short" className="bg-neutral-900">
                Short
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-white/50">Risk %</label>
            <input
              type="number"
              step="0.1"
              value={trade.risk}
              disabled={shouldLockEntryFields}
              onChange={(e) =>
                handleInputChange("risk", Number(e.target.value))
              }
              className="w-full rounded-lg bg-white/5 px-4 py-3 outline-none border border-white/10 disabled:opacity-60 disabled:cursor-not-allowed"
              placeholder="1"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-white/50">Open Time</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                />
                <input
                  type="date"
                  disabled={shouldLockEntryFields}
                  value={trade.openTime?.split("T")[0] || ""}
                  onChange={(e) => {
                    const date = e.target.value;
                    const time =
                      trade.openTime?.split("T")[1]?.slice(0, 5) || "00:00";
                    handleInputChange("openTime", `${date}T${time}`);
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none focus:border-white/30 transition disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div className="relative">
                <Clock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                />
                <input
                  type="time"
                  disabled={shouldLockEntryFields}
                  value={trade.openTime?.split("T")[1]?.slice(0, 5) || ""}
                  onChange={(e) => {
                    const time = e.target.value;
                    const date = trade.openTime?.split("T")[0] || "";
                    handleInputChange("openTime", `${date}T${time}`);
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none focus:border-white/30 transition disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Setup Criteria</h3>
            <p className="text-sm text-white/60">
              Checked: {checkedCount}/{criteriaList.length} · Missing:{" "}
              {missingCount}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {criteriaList.map((item) => {
              const checked = trade.setupCriteria[item.key];

              return (
                <label
                  key={item.key}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    checked ? "bg-green-500/10 text-green-300" : "bg-white/5"
                  } ${
                    shouldLockEntryFields
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={shouldLockEntryFields}
                    onChange={() => handleCriteriaChange(item.key)}
                  />
                  <span>{item.label}</span>
                </label>
              );
            })}
          </div>

          {!canPassSetup && (
            <p className="mt-3 text-sm text-red-400">
              You cannot save this trade yet. Two or more setup criteria are
              missing.
            </p>
          )}
        </div>

        {!isClosedTrade && (
          <>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Pre Setup Images</h3>

              {!shouldLockEntryFields && (
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Paste TradingView image URL..."
                    value={preImgInput}
                    onChange={(e) => setPreImgInput(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddPreImage();
                      }
                    }}
                  />

                  <button
                    type="button"
                    onClick={handleAddPreImage}
                    className="rounded-lg bg-white px-4 py-2 text-sm text-black hover:bg-white/90"
                  >
                    Add
                  </button>
                </div>
              )}

              {trade.preSetupImg.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                  {trade.preSetupImg.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Pre setup ${index + 1}`}
                        className="rounded-xl border border-white/10"
                      />
                      {!shouldLockEntryFields && (
                        <button
                          type="button"
                          onClick={() => removePreImage(index)}
                          className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Pre-Trade Notes</h3>
              <textarea
                rows={4}
                value={trade.notes}
                readOnly={shouldLockEntryFields}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 p-4 outline-none read-only:opacity-60 read-only:cursor-not-allowed"
                placeholder="Pre-trade reasoning, market context, bias..."
              />
            </div>
          </>
        )}

        {shouldShowCloseSection && (
          <div className="space-y-2">
            <label className="text-xs text-white/50">Closing Time</label>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="date"
                  value={effectiveCloseTime?.split("T")[0] || ""}
                  onChange={(e) => {
                    const date = e.target.value;
                    const time =
                      effectiveCloseTime?.split("T")[1]?.slice(0, 5) || "00:00";
                    handleInputChange("closeTime", `${date}T${time}`);
                  }}
                  className="w-full pl-4 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none"
                />
              </div>

              <div className="relative">
                <input
                  type="time"
                  value={effectiveCloseTime?.split("T")[1]?.slice(0, 5) || ""}
                  onChange={(e) => {
                    const time = e.target.value;
                    const date =
                      effectiveCloseTime?.split("T")[0] ||
                      trade.openTime.split("T")[0];
                    handleInputChange("closeTime", `${date}T${time}`);
                  }}
                  className="w-full pl-4 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {shouldShowCloseSection && (
          <div>
            <h3 className="mb-2 text-lg font-semibold">Post Setup Image</h3>

            <div className="flex gap-3">
              <input
                type="text"
                value={postImgInput}
                onChange={(e) => setPostImgInput(e.target.value)}
                placeholder="Paste TradingView post-trade image URL..."
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddPostImage();
                  }
                }}
              />

              <button
                type="button"
                onClick={handleAddPostImage}
                className="rounded-lg bg-white px-4 py-2 text-sm text-black hover:bg-white/90"
              >
                Add
              </button>
            </div>

            {trade.postSetupImg && (
              <div className="mt-4 relative">
                <img
                  src={trade.postSetupImg}
                  alt="Post setup"
                  className="rounded-xl border border-white/10"
                />
                <button
                  type="button"
                  onClick={removePostImage}
                  className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        )}

        {shouldShowCloseSection && (
          <div>
            <h3 className="mb-2 text-lg font-semibold">Post Analysis</h3>
            <textarea
              rows={4}
              value={trade.postNotes}
              onChange={(e) => handleInputChange("postNotes", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 p-4 outline-none"
              placeholder="Execution review, mistakes, what happened after entry..."
            />
          </div>
        )}

        {shouldShowCloseSection && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs text-white/50">PnL</label>
              <input
                type="number"
                step="0.01"
                value={trade.pnl ?? ""}
                onChange={(e) =>
                  handleInputChange(
                    "pnl",
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
                className="w-full rounded-lg bg-white/5 px-4 py-3 outline-none border border-white/10"
                placeholder="e.g. 1.50 or -0.75"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-white/50">PnL in USD</label>
              <input
                type="number"
                step="0.01"
                value={trade.pnl_in_usd ?? ""}
                onChange={(e) =>
                  handleInputChange(
                    "pnl_in_usd",
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
                className="w-full rounded-lg bg-white/5 px-4 py-3 outline-none border border-white/10"
                placeholder="e.g. 125.50 or -75"
              />
            </div>
          </div>
        )}

        {errors.length > 0 && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
            <h4 className="mb-2 font-medium text-red-300">Cannot save trade</h4>
            <ul className="space-y-1 text-sm text-red-200">
              {errors.map((error, i) => (
                <li key={i}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end gap-3 border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={handleReset}
            disabled={isClosedTrade}
            className={`rounded-md px-5 py-2 text-sm transition ${
              isClosedTrade
                ? "bg-white/10 text-white/40 cursor-not-allowed"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            Reset
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaveDisabled}
            className={`rounded-md px-5 py-2 text-sm transition ${
              isSaveDisabled
                ? "bg-white/20 text-white/40 cursor-not-allowed"
                : "bg-white text-black hover:bg-white/90"
            }`}
          >
            {isClosedTrade
              ? "Trade Closed"
              : shouldShowCloseSection
              ? "Close Trade"
              : "Save Trade"}
          </button>
        </div>
      </div>
    </div>
  );
}
