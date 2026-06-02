"use client";

import { useMemo, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { SystemCriterion, TradingSystem } from "@/lib/types";
import { useTradingSystem } from "@/store/tradingSystem/useTradingSystem";
import {
  updateTradingSystem,
  updateTradingPairs,
  updateTradingSteps,
  updateTradingCriteria,
} from "@/store/tradingSystem/controller";

type Props = {
  tradingSystem: TradingSystem;
  isPending: boolean;
};

const normalizeSystem = (system: TradingSystem): TradingSystem => ({
  name: system.name || "",
  description: system.description || "",
  edgeSummary: system.edgeSummary || "",
  notes: system.notes || "",
  steps: system.steps || [],
  pairs: system.pairs || [],
  criteria: system.criteria || [],
});

const createCriterionId = (label: string) =>
  label
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w]/g, "")
    .replace(/^(\d)/, "_$1");

const SystemEditor = ({ tradingSystem, isPending }: Props) => {
  const { dispatch } = useTradingSystem();

  const baseSystem = useMemo(
    () => normalizeSystem(tradingSystem),
    [tradingSystem]
  );

  const [localSystem, setLocalSystem] = useState<TradingSystem>(() =>
    normalizeSystem(tradingSystem)
  );

  const [newPair, setNewPair] = useState("");
  const [newStep, setNewStep] = useState("");
  const [newCriterionLabel, setNewCriterionLabel] = useState("");
  const [newCriterionRequired, setNewCriterionRequired] = useState(true);

  const hasUnsavedChanges =
    JSON.stringify(localSystem) !== JSON.stringify(baseSystem);

  const handleSaveOverview = async () => {
    await dispatch(updateTradingSystem(localSystem)).unwrap();
  };

  const handleAddPair = async () => {
    const value = newPair.trim().toUpperCase();
    if (!value) return;
    if ((localSystem.pairs || []).includes(value)) {
      setNewPair("");
      return;
    }

    const updatedPairs = [...(localSystem.pairs || []), value];
    setLocalSystem((prev) => ({ ...prev, pairs: updatedPairs }));
    setNewPair("");

    await dispatch(updateTradingPairs({ pairs: updatedPairs })).unwrap();
  };

  const handleUpdatePair = (index: number, value: string) => {
    setLocalSystem((prev) => ({
      ...prev,
      pairs: (prev.pairs || []).map((pair, i) =>
        i === index ? value.toUpperCase() : pair
      ),
    }));
  };

  const handleBlurPairs = async () => {
    const cleanedPairs = (localSystem.pairs || [])
      .map((pair) => pair.trim().toUpperCase())
      .filter(Boolean);

    setLocalSystem((prev) => ({ ...prev, pairs: cleanedPairs }));
    await dispatch(updateTradingPairs({ pairs: cleanedPairs })).unwrap();
  };

  const handleRemovePair = async (index: number) => {
    const updatedPairs = (localSystem.pairs || []).filter(
      (_, i) => i !== index
    );
    setLocalSystem((prev) => ({ ...prev, pairs: updatedPairs }));
    await dispatch(updateTradingPairs({ pairs: updatedPairs })).unwrap();
  };

  const handleAddStep = async () => {
    const value = newStep.trim();
    if (!value) return;

    const updatedSteps = [...(localSystem.steps || []), value];
    setLocalSystem((prev) => ({ ...prev, steps: updatedSteps }));
    setNewStep("");

    await dispatch(updateTradingSteps({ steps: updatedSteps })).unwrap();
  };

  const handleUpdateStep = (index: number, value: string) => {
    setLocalSystem((prev) => ({
      ...prev,
      steps: (prev.steps || []).map((step, i) => (i === index ? value : step)),
    }));
  };

  const handleBlurSteps = async () => {
    const cleanedSteps = (localSystem.steps || [])
      .map((step) => step.trim())
      .filter(Boolean);

    setLocalSystem((prev) => ({ ...prev, steps: cleanedSteps }));
    await dispatch(updateTradingSteps({ steps: cleanedSteps })).unwrap();
  };

  const handleRemoveStep = async (index: number) => {
    const updatedSteps = (localSystem.steps || []).filter(
      (_, i) => i !== index
    );
    setLocalSystem((prev) => ({ ...prev, steps: updatedSteps }));
    await dispatch(updateTradingSteps({ steps: updatedSteps })).unwrap();
  };

  const handleAddCriterion = async () => {
    const label = newCriterionLabel.trim();
    if (!label) return;

    const newCriterion: SystemCriterion = {
      id: createCriterionId(label),
      label,
      required: newCriterionRequired,
    };

    const exists = (localSystem.criteria || []).some(
      (criterion) => criterion.id === newCriterion.id
    );
    if (exists) {
      setNewCriterionLabel("");
      return;
    }

    const updatedCriteria = [...(localSystem.criteria || []), newCriterion];
    setLocalSystem((prev) => ({ ...prev, criteria: updatedCriteria }));
    setNewCriterionLabel("");
    setNewCriterionRequired(true);

    await dispatch(
      updateTradingCriteria({ criteria: updatedCriteria })
    ).unwrap();
  };

  const handleUpdateCriterion = (
    index: number,
    key: keyof SystemCriterion,
    value: string | boolean
  ) => {
    setLocalSystem((prev) => ({
      ...prev,
      criteria: (prev.criteria || []).map((criterion, i) =>
        i === index ? { ...criterion, [key]: value } : criterion
      ),
    }));
  };

  const handleBlurCriteria = async () => {
    const cleanedCriteria = (localSystem.criteria || [])
      .map((criterion) => ({
        ...criterion,
        id: criterion.id.trim() || createCriterionId(criterion.label),
        label: criterion.label.trim(),
      }))
      .filter((criterion) => criterion.label);

    setLocalSystem((prev) => ({ ...prev, criteria: cleanedCriteria }));
    await dispatch(
      updateTradingCriteria({ criteria: cleanedCriteria })
    ).unwrap();
  };

  const handleRemoveCriterion = async (index: number) => {
    const updatedCriteria = (localSystem.criteria || []).filter(
      (_, i) => i !== index
    );
    setLocalSystem((prev) => ({ ...prev, criteria: updatedCriteria }));
    await dispatch(
      updateTradingCriteria({ criteria: updatedCriteria })
    ).unwrap();
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">System</h1>
          <p className="mt-1 text-sm text-white/45">
            Manage your trading model, execution rules, and setup criteria.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveOverview}
          disabled={!hasUnsavedChanges || isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-6">
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold">System Overview</h2>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs text-white/50">System Name</label>
                <input
                  value={localSystem.name || ""}
                  onChange={(e) =>
                    setLocalSystem((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/50">Description</label>
                <input
                  value={localSystem.description || ""}
                  onChange={(e) =>
                    setLocalSystem((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <label className="text-xs text-white/50">Edge Summary</label>
              <textarea
                rows={4}
                value={localSystem.edgeSummary || ""}
                onChange={(e) =>
                  setLocalSystem((prev) => ({
                    ...prev,
                    edgeSummary: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
              />
            </div>

            <div className="mt-4 space-y-2">
              <label className="text-xs text-white/50">Notes</label>
              <textarea
                rows={4}
                value={localSystem.notes || ""}
                onChange={(e) =>
                  setLocalSystem((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
              />
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold">Allowed Pairs</h2>

            <div className="mt-5 flex gap-3">
              <input
                value={newPair}
                onChange={(e) => setNewPair(e.target.value)}
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
              {(localSystem.pairs || []).map((pair, index) => (
                <div
                  key={`${pair}-${index}`}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3"
                >
                  <input
                    value={pair}
                    onChange={(e) => handleUpdatePair(index, e.target.value)}
                    onBlur={handleBlurPairs}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePair(index)}
                    className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-300 transition hover:bg-red-500/20"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-6">
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold">Execution Steps</h2>

            <div className="mt-5 flex gap-3">
              <input
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
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
              {(localSystem.steps || []).map((step, index) => (
                <div
                  key={`${step}-${index}`}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white/70">
                    {index + 1}
                  </div>
                  <input
                    value={step}
                    onChange={(e) => handleUpdateStep(index, e.target.value)}
                    onBlur={handleBlurSteps}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(index)}
                    className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-300 transition hover:bg-red-500/20"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold">Setup Criteria</h2>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_auto]">
              <input
                value={newCriterionLabel}
                onChange={(e) => setNewCriterionLabel(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCriterion();
                  }
                }}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                placeholder="Add criterion"
              />

              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                <input
                  type="checkbox"
                  checked={newCriterionRequired}
                  onChange={(e) => setNewCriterionRequired(e.target.checked)}
                />
                Required
              </label>

              <button
                type="button"
                onClick={handleAddCriterion}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              {(localSystem.criteria || []).map((criterion, index) => (
                <div
                  key={`${criterion.id}-${index}`}
                  className="grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 md:grid-cols-[1fr_220px_auto]"
                >
                  <input
                    value={criterion.label}
                    onChange={(e) =>
                      handleUpdateCriterion(index, "label", e.target.value)
                    }
                    onBlur={handleBlurCriteria}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                  />

                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="text-sm text-white/70">Required</span>
                    <input
                      type="checkbox"
                      checked={criterion.required}
                      onChange={(e) =>
                        handleUpdateCriterion(
                          index,
                          "required",
                          e.target.checked
                        )
                      }
                      onBlur={handleBlurCriteria}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveCriterion(index)}
                    className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-300 transition hover:bg-red-500/20"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SystemEditor;
