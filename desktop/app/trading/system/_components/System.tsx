"use client";

import React, { useMemo, useState } from "react";
import { Check, Plus, RotateCcw, Trash2, X } from "lucide-react";
import { useTradingSystem } from "@/store/tradingSystem/useTradingSystem";
import {
  addTradingSystemCriterion,
  addTradingSystemPair,
  addTradingSystemStep,
  removeTradingSystemCriterion,
  removeTradingSystemPair,
  removeTradingSystemStep,
  resetTradingSystem,
  updateTradingSystemCriterion,
  updateTradingSystemField,
  updateTradingSystemPair,
  updateTradingSystemStep,
} from "@/store/tradingSystem/slice";

const System = () => {
  const { tradingSystem, isPending, errMsg, dispatch } = useTradingSystem();

  const [pairInput, setPairInput] = useState("");
  const [stepInput, setStepInput] = useState("");
  const [criterionInput, setCriterionInput] = useState("");
  const [criterionRequired, setCriterionRequired] = useState(true);

  const stats = useMemo(() => {
    const pairs = tradingSystem?.pairs.length || 0;
    const steps = tradingSystem?.steps.length || 0;
    const criteria = tradingSystem?.criteria.length || 0;
    const requiredCount =
      tradingSystem?.criteria.filter((item) => item.required).length || 0;

    return { pairs, steps, criteria, requiredCount };
  }, [tradingSystem]);

  const createCriterionId = (label: string) => {
    return label
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleAddPair = () => {
    const value = pairInput.trim().toUpperCase();
    if (!value) return;
    dispatch(addTradingSystemPair(value));
    setPairInput("");
  };

  const handleAddStep = () => {
    const value = stepInput.trim();
    if (!value) return;
    dispatch(addTradingSystemStep(value));
    setStepInput("");
  };

  const handleAddCriterion = () => {
    const label = criterionInput.trim();
    if (!label) return;

    dispatch(
      addTradingSystemCriterion({
        id: createCriterionId(label),
        label,
        required: criterionRequired,
      })
    );

    setCriterionInput("");
    setCriterionRequired(true);
  };

  if (!tradingSystem) {
    return (
      <div className="p-6 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-white/60">No trading system found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                System
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                Trading System
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-white/50">
                This page controls the exact data used in LogTrade: allowed
                pairs, criteria, required criteria, steps, and edge notes.
              </p>
            </div>

            <button
              type="button"
              onClick={() => dispatch(resetTradingSystem())}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10"
            >
              <RotateCcw size={16} />
              Reset system
            </button>
          </div>

          {errMsg && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              {errMsg}
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/35">
                Pairs
              </p>
              <p className="mt-2 text-2xl font-semibold">{stats.pairs}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/35">
                Steps
              </p>
              <p className="mt-2 text-2xl font-semibold">{stats.steps}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/35">
                Criteria
              </p>
              <p className="mt-2 text-2xl font-semibold">{stats.criteria}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/35">
                Required
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {stats.requiredCount}
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col gap-6">
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <h2 className="text-lg font-semibold">System Overview</h2>
              <p className="mt-1 text-sm text-white/45">
                Main edge details that describe the model.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs text-white/50">System Name</label>
                  <input
                    value={tradingSystem.name}
                    onChange={(e) =>
                      dispatch(
                        updateTradingSystemField({
                          field: "name",
                          value: e.target.value,
                        })
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-white/50">Description</label>
                  <input
                    value={tradingSystem.description}
                    onChange={(e) =>
                      dispatch(
                        updateTradingSystemField({
                          field: "description",
                          value: e.target.value,
                        })
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className="text-xs text-white/50">Edge Summary</label>
                <textarea
                  rows={4}
                  value={tradingSystem.edgeSummary}
                  onChange={(e) =>
                    dispatch(
                      updateTradingSystemField({
                        field: "edgeSummary",
                        value: e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
                />
              </div>

              <div className="mt-4 space-y-2">
                <label className="text-xs text-white/50">Notes</label>
                <textarea
                  rows={4}
                  value={tradingSystem.notes || ""}
                  onChange={(e) =>
                    dispatch(
                      updateTradingSystemField({
                        field: "notes",
                        value: e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
                />
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <h2 className="text-lg font-semibold">Allowed Pairs</h2>
              <p className="mt-1 text-sm text-white/45">
                These should match the pair dropdown in LogTrade.
              </p>

              <div className="mt-5 flex gap-3">
                <input
                  value={pairInput}
                  onChange={(e) => setPairInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddPair();
                    }
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                  placeholder="Add pair e.g. EURUSD"
                />
                <button
                  type="button"
                  onClick={handleAddPair}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                {tradingSystem.pairs.map((pair, index) => (
                  <div
                    key={`${pair}-${index}`}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3"
                  >
                    <input
                      value={pair}
                      onChange={(e) =>
                        dispatch(
                          updateTradingSystemPair({
                            index,
                            value: e.target.value,
                          })
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => dispatch(removeTradingSystemPair(index))}
                      className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-300 transition hover:bg-red-500/20"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                {tradingSystem.pairs.length === 0 && (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/50">
                    No pairs added yet.
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-6">
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <h2 className="text-lg font-semibold">Execution Steps</h2>
              <p className="mt-1 text-sm text-white/45">
                Step-by-step rules before entry.
              </p>

              <div className="mt-5 flex gap-3">
                <input
                  value={stepInput}
                  onChange={(e) => setStepInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddStep();
                    }
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                  placeholder="Add execution step"
                />
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                {tradingSystem.steps.map((step, index) => (
                  <div
                    key={`${step}-${index}`}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white/70">
                      {index + 1}
                    </div>

                    <input
                      value={step}
                      onChange={(e) =>
                        dispatch(
                          updateTradingSystemStep({
                            index,
                            value: e.target.value,
                          })
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => dispatch(removeTradingSystemStep(index))}
                      className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-300 transition hover:bg-red-500/20"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                {tradingSystem.steps.length === 0 && (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/50">
                    No steps added yet.
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <h2 className="text-lg font-semibold">Setup Criteria</h2>
              <p className="mt-1 text-sm text-white/45">
                This list should reflect exactly what appears in LogTrade.
              </p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-col gap-3">
                  <input
                    value={criterionInput}
                    onChange={(e) => setCriterionInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCriterion();
                      }
                    }}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                    placeholder="Add criterion label"
                  />

                  <div className="flex items-center justify-between gap-3">
                    <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
                      <input
                        type="checkbox"
                        checked={criterionRequired}
                        onChange={(e) => setCriterionRequired(e.target.checked)}
                      />
                      Required in LogTrade
                    </label>

                    <button
                      type="button"
                      onClick={handleAddCriterion}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                    >
                      <Plus size={16} />
                      Add criterion
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                {tradingSystem.criteria.map((criterion) => (
                  <div
                    key={criterion.id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <input
                          value={criterion.label}
                          onChange={(e) => {
                            const nextLabel = e.target.value;
                            const nextId =
                              createCriterionId(nextLabel) || criterion.id;

                            dispatch(
                              updateTradingSystemCriterion({
                                id: criterion.id,
                                updates: {
                                  id: nextId,
                                  label: nextLabel,
                                },
                              })
                            );
                          }}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            dispatch(removeTradingSystemCriterion(criterion.id))
                          }
                          className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-300 transition hover:bg-red-500/20"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/55">
                          ID:{" "}
                          <span className="font-medium text-white/80">
                            {criterion.id}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              updateTradingSystemCriterion({
                                id: criterion.id,
                                updates: { required: !criterion.required },
                              })
                            )
                          }
                          className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${
                            criterion.required
                              ? "border border-green-500/20 bg-green-500/10 text-green-300 hover:bg-green-500/20"
                              : "border border-white/10 bg-white/5 text-white/75 hover:bg-white/10"
                          }`}
                        >
                          {criterion.required ? (
                            <Check size={16} />
                          ) : (
                            <X size={16} />
                          )}
                          {criterion.required ? "Required" : "Optional"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {tradingSystem.criteria.length === 0 && (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/50">
                    No criteria added yet.
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <h2 className="text-lg font-semibold">Current System Snapshot</h2>
          <p className="mt-1 text-sm text-white/45">
            Reference only. This is the exact structure feeding your trade log.
          </p>

          <pre className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/70">
            {JSON.stringify(tradingSystem, null, 2)}
          </pre>

          {isPending && <p className="mt-4 text-sm text-white/50">Saving...</p>}
        </section>
      </div>
    </div>
  );
};

export default System;
