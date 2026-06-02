"use client";

import { Save } from "lucide-react";
import { useState } from "react";
import { useTradingSystem } from "@/store/tradingSystem/useTradingSystem";
import { createTradingSystem } from "@/store/tradingSystem/controller";
import { TradingSystem } from "@/lib/types";

const initialSystem: TradingSystem = {
  name: "",
  description: "",
  edgeSummary: "",
  notes: "",
  steps: [],
  pairs: [],
  criteria: [],
};

const CreateSystemModal = () => {
  const { dispatch, isPending } = useTradingSystem();
  const [form, setForm] = useState<TradingSystem>(initialSystem);

  const handleCreate = async () => {
    if (!form.name?.trim()) return;
    await dispatch(
      createTradingSystem({
        ...form,
        name: form.name.trim(),
        description: form.description?.trim() || "",
        edgeSummary: form.edgeSummary?.trim() || "",
        notes: form.notes?.trim() || "",
      })
    ).unwrap();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#0B0B0F] p-6 shadow-2xl">
        <h2 className="text-xl font-semibold">Create Trading System</h2>
        <p className="mt-1 text-sm text-white/50">
          No system found yet. Fill this in first before using the page.
        </p>

        <div className="mt-6 space-y-4">
          <input
            value={form.name || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
            placeholder="System Name"
          />

          <input
            value={form.description || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
            placeholder="Description"
          />

          <textarea
            rows={4}
            value={form.edgeSummary || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, edgeSummary: e.target.value }))
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
            placeholder="Edge Summary"
          />

          <textarea
            rows={4}
            value={form.notes || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, notes: e.target.value }))
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
            placeholder="Notes"
          />

          <button
            type="button"
            onClick={handleCreate}
            disabled={!form.name?.trim() || isPending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={16} />
            {isPending ? "Creating..." : "Create System"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSystemModal;
