"use client";

import { SystemCriterion, TradeFormData } from "@/lib/types";
import { Calendar, Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { useTradingSystem } from "@/store/tradingSystem/useTradingSystem";

const ACCOUNTS_STATIC = ["m4cren", "Funded_m4cren"] as const;

type Props = {
  onClose: () => void;
  onSave: (trade: TradeFormData & { id?: string }) => void;
  selectedDate: string | null;
  existingTrade?: (TradeFormData & { id: string }) | null;
};

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
  setupCriteria: [],
  accounts: [],
  pnl_in_usd: null,
});
const normalizeSetupCriteria = (
  setupCriteria:
    | TradeFormData["setupCriteria"]
    | Record<string, boolean>
    | undefined,
  criteriaList: SystemCriterion[]
): SystemCriterion[] => {
  if (!setupCriteria) return [];

  if (Array.isArray(setupCriteria)) {
    return setupCriteria;
  }

  return criteriaList.filter((criterion) => setupCriteria[criterion.id]);
};
export default function LogTrade({
  onClose,
  onSave,
  selectedDate,
  existingTrade,
}: Props) {
  const { tradingSystem } = useTradingSystem();

  const criteriaList = tradingSystem?.criteria || [];
  const pairs = tradingSystem?.pairs || [];

  const requiredCriteria = useMemo(
    () => criteriaList.filter((item) => item.required),
    [criteriaList]
  );
  const [trade, setTrade] = useState<TradeFormData>(() =>
    existingTrade
      ? {
          ...existingTrade,
          preSetupImg: Array.isArray(existingTrade.preSetupImg)
            ? [...existingTrade.preSetupImg]
            : [],
          setupCriteria: normalizeSetupCriteria(
            existingTrade.setupCriteria as
              | TradeFormData["setupCriteria"]
              | Record<string, boolean>,
            criteriaList
          ),
          accounts: Array.isArray(existingTrade.accounts)
            ? [...existingTrade.accounts]
            : [],
        }
      : createDefaultTrade(selectedDate)
  );

  const [errors, setErrors] = useState<string[]>([]);
  const [preImgInput, setPreImgInput] = useState("");
  const [postImgInput, setPostImgInput] = useState(
    existingTrade?.postSetupImg || ""
  );

  const selectedCriteriaIds = useMemo(() => {
    return new Set(trade.setupCriteria.map((item) => item.id));
  }, [trade.setupCriteria]);

  const checkedCount = useMemo(() => {
    return criteriaList.filter((item) => selectedCriteriaIds.has(item.id))
      .length;
  }, [criteriaList, selectedCriteriaIds]);

  const missingCount = useMemo(() => {
    return requiredCriteria.filter((item) => !selectedCriteriaIds.has(item.id))
      .length;
  }, [requiredCriteria, selectedCriteriaIds]);

  const setupGrade = useMemo(() => {
    if (criteriaList.length === 0) return "N/A";
    if (missingCount === 0) return "A+";
    return "Invalid";
  }, [criteriaList.length, missingCount]);

  const canPassSetup = useMemo(() => {
    if (requiredCriteria.length === 0) return true;
    return requiredCriteria.every((item) => selectedCriteriaIds.has(item.id));
  }, [requiredCriteria, selectedCriteriaIds]);

  const isExistingTrade = !!existingTrade;
  const isClosedTrade = !!trade.closeTime;
  const shouldShowCloseSection = isExistingTrade && !isClosedTrade;
  const shouldLockEntryFields = isExistingTrade;
  const shouldLockAllFields = isClosedTrade;

  const tradeStatus = isClosedTrade ? "Recorded" : "Open";
  const tradeDuration = getTradeDuration(trade.openTime, trade.closeTime);

  const effectiveCloseTime =
    trade.closeTime || (shouldShowCloseSection ? getNowLocalDateTime() : null);

  const isCriterionChecked = (criterionId: string) => {
    return selectedCriteriaIds.has(criterionId);
  };

  const handleCriteriaChange = (criterion: SystemCriterion) => {
    if (shouldLockEntryFields) return;

    setTrade((prev) => {
      const exists = prev.setupCriteria.some(
        (item) => item.id === criterion.id
      );

      return {
        ...prev,
        setupCriteria: exists
          ? prev.setupCriteria.filter((item) => item.id !== criterion.id)
          : [...prev.setupCriteria, criterion],
      };
    });
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

    if (!tradingSystem) {
      nextErrors.push("No active trading system found.");
    }

    if (trade.accounts.length === 0) {
      nextErrors.push("At least one account is required.");
    }

    if (!trade.pair.trim()) {
      nextErrors.push("Pair is required.");
    }

    if (!trade.openTime) {
      nextErrors.push("Open time is required.");
    }

    if (!trade.risk || trade.risk <= 0) {
      nextErrors.push("Risk must be greater than 0.");
    }

    if (!canPassSetup) {
      nextErrors.push("All required setup criteria must be completed.");
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
          preSetupImg: Array.isArray(existingTrade.preSetupImg)
            ? [...existingTrade.preSetupImg]
            : [],
          setupCriteria: normalizeSetupCriteria(
            existingTrade.setupCriteria as
              | TradeFormData["setupCriteria"]
              | Record<string, boolean>,
            criteriaList
          ),
          accounts: Array.isArray(existingTrade.accounts)
            ? [...existingTrade.accounts]
            : [],
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card max-h-[90vh] w-full max-w-[950px] overflow-y-auto rounded-2xl p-8 shadow-xl space-y-8"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-2xl font-semibold">
              {existingTrade ? "Update Trade" : "Trade Entry"}
            </h2>
            <p className="text-sm text-white/50">
              Save open trades or record completed trades with post analysis.
            </p>
            {tradingSystem?.name && (
              <p className="mt-1 text-xs text-white/40">
                Active system:{" "}
                <span className="font-medium text-white/70">
                  {tradingSystem.name}
                </span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white/10 px-4 py-1 text-sm">
              Setup Grade:{" "}
              <span
                className={
                  setupGrade === "A+"
                    ? "text-green-400"
                    : setupGrade === "Invalid"
                    ? "text-red-400"
                    : "text-white/70"
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
                  <p className="text-sm text-white">
                    {trade.pnl_in_usd ?? "—"}
                  </p>
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
                  <div className="whitespace-pre-wrap rounded-lg border border-white/10 bg-black/20 p-4 text-sm">
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
                  <div className="whitespace-pre-wrap rounded-lg border border-white/10 bg-black/20 p-4 text-sm">
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
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition ${
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
              onChange={(e) => handleInputChange("pair", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="" className="bg-neutral-900 text-white/50">
                Select pair
              </option>
              {pairs.map((pair) => (
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
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none disabled:cursor-not-allowed disabled:opacity-60"
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
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none disabled:cursor-not-allowed disabled:opacity-60"
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
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 outline-none transition focus:border-white/30 disabled:cursor-not-allowed disabled:opacity-60"
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
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 outline-none transition focus:border-white/30 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Setup Criteria
              {tradingSystem?.name ? (
                <span className="ml-2 text-sm font-normal text-white/45">
                  ({tradingSystem.name})
                </span>
              ) : null}
            </h3>

            <p className="text-sm text-white/60">
              Checked: {checkedCount}/{criteriaList.length} · Missing:{" "}
              {missingCount}
            </p>
          </div>

          {criteriaList.length === 0 ? (
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-yellow-200">
              No criteria found in your active system.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {criteriaList.map((item) => {
                const checked = isCriterionChecked(item.id);

                return (
                  <label
                    key={item.id}
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
                      onChange={() => handleCriteriaChange(item)}
                    />
                    <div className="flex flex-col">
                      <span>{item.label}</span>
                      {item.required && (
                        <span className="text-[11px] text-white/40">
                          Required
                        </span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          )}

          {!canPassSetup && criteriaList.length > 0 && (
            <p className="mt-3 text-sm text-red-400">
              You cannot save this trade yet. All required setup criteria must
              be completed.
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
                          className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 text-xs text-white"
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
                className="w-full rounded-lg border border-white/10 bg-white/5 p-4 outline-none read-only:cursor-not-allowed read-only:opacity-60"
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
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-4 pr-4 outline-none"
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
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-4 pr-4 outline-none"
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
              <div className="relative mt-4">
                <img
                  src={trade.postSetupImg}
                  alt="Post setup"
                  className="rounded-xl border border-white/10"
                />
                <button
                  type="button"
                  onClick={removePostImage}
                  className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 text-xs text-white"
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
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none"
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
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none"
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
                ? "cursor-not-allowed bg-white/10 text-white/40"
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
                ? "cursor-not-allowed bg-white/20 text-white/40"
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
