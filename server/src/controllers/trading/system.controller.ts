import type { Request, Response } from "express";
import { supabaseFromReq } from "../../lib/supabaseFromReq.js";

type SystemCriterion = {
  id: string;
  label: string;
  required: boolean;
};

type TradingSystemRow = {
  id: number;
  created_at: string;
  name: string | null;
  description: string | null;
  edgeSummary: string | null;
  notes: string | null;
  uuid?: string;
  steps: string | null;
  pairs: string | null;
  criteria: unknown;
};

const parseTextArray = (value: unknown): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  return [];
};

const parseCriteria = (value: unknown): SystemCriterion[] => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value as SystemCriterion[];
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as SystemCriterion[]) : [];
    } catch {
      return [];
    }
  }

  return [];
};

const formatTradingSystem = (data: TradingSystemRow) => ({
  ...data,
  steps: parseTextArray(data.steps),
  pairs: parseTextArray(data.pairs),
  criteria: parseCriteria(data.criteria),
});

const getErrorMessage = (error: unknown, fallback: string) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return fallback;
};

const getExistingSystem = async (
  supabase: ReturnType<typeof supabaseFromReq>
): Promise<TradingSystemRow | null> => {
  const { data, error } = await supabase
    .from("trading_system")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data as TradingSystemRow | null;
};

const updateSystemRow = async (
  supabase: ReturnType<typeof supabaseFromReq>,
  id: number,
  payload: Record<string, unknown>
): Promise<TradingSystemRow> => {
  const { data, error } = await supabase
    .from("trading_system")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as TradingSystemRow;
};

export const fetchTradingSystem = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);

  try {
    const data = await getExistingSystem(supabase);

    if (!data) {
      return res.json(null);
    }

    return res.json(formatTradingSystem(data));
  } catch (error: unknown) {
    return res.status(500).json({
      error: getErrorMessage(error, "Failed to fetch trading system"),
    });
  }
};

export const createTradingSystem = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;

  try {
    const existing = await getExistingSystem(supabase);

    if (existing) {
      return res.status(400).json({ error: "Trading system already exists" });
    }

    const payload = {
      name: body.name ?? null,
      description: body.description ?? null,
      edgeSummary: body.edgeSummary ?? null,
      notes: body.notes ?? null,
      steps: body.steps ?? [],
      pairs: body.pairs ?? [],
      criteria: body.criteria ?? [],
    };
    const { data, error } = await supabase
      .from("trading_system")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json(formatTradingSystem(data as TradingSystemRow));
  } catch (error: unknown) {
    return res.status(500).json({
      error: getErrorMessage(error, "Failed to create trading system"),
    });
  }
};

export const updateTradingSystem = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const body = req.body;

  try {
    const existing = await getExistingSystem(supabase);

    if (!existing) {
      return res.status(404).json({ error: "Trading system not found" });
    }

    const updated = await updateSystemRow(supabase, existing.id, {
      name: body.name ?? null,
      description: body.description ?? null,
      edgeSummary: body.edgeSummary ?? null,
      notes: body.notes ?? null,
      steps: body.steps ?? null,
      pairs: body.pairs ?? null,
      criteria: body.criteria ?? [],
    });

    return res.json(formatTradingSystem(updated));
  } catch (error: unknown) {
    return res.status(500).json({
      error: getErrorMessage(error, "Failed to update trading system"),
    });
  }
};

export const addTradingPair = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const { pair } = req.body;

  try {
    const existing = await getExistingSystem(supabase);

    if (!existing) {
      return res.status(404).json({ error: "Trading system not found" });
    }

    const currentPairs = parseTextArray(existing.pairs);
    const nextPair = String(pair || "")
      .trim()
      .toUpperCase();

    if (!nextPair) {
      return res.status(400).json({ error: "Pair is required" });
    }

    const updatedPairs = currentPairs.includes(nextPair)
      ? currentPairs
      : [...currentPairs, nextPair];

    const updated = await updateSystemRow(supabase, existing.id, {
      pairs: updatedPairs,
    });
    return res.json(formatTradingSystem(updated));
  } catch (error: unknown) {
    return res.status(500).json({
      error: getErrorMessage(error, "Failed to add pair"),
    });
  }
};

export const removeTradingPair = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const { pair } = req.body;

  try {
    const existing = await getExistingSystem(supabase);

    if (!existing) {
      return res.status(404).json({ error: "Trading system not found" });
    }

    const currentPairs = parseTextArray(existing.pairs);
    const targetPair = String(pair || "")
      .trim()
      .toUpperCase();

    const updatedPairs = currentPairs.filter((item) => item !== targetPair);

    const updated = await updateSystemRow(supabase, existing.id, {
      pairs: updatedPairs,
    });

    return res.json(formatTradingSystem(updated));
  } catch (error: unknown) {
    return res.status(500).json({
      error: getErrorMessage(error, "Failed to remove pair"),
    });
  }
};

export const updateTradingPairs = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const { pairs } = req.body;

  try {
    const existing = await getExistingSystem(supabase);

    if (!existing) {
      return res.status(404).json({ error: "Trading system not found" });
    }

    const updatedPairs = Array.isArray(pairs)
      ? pairs.map((pair) => String(pair).trim().toUpperCase()).filter(Boolean)
      : [];

    const updated = await updateSystemRow(supabase, existing.id, {
      pairs: updatedPairs,
    });

    return res.json(formatTradingSystem(updated));
  } catch (error: unknown) {
    return res.status(500).json({
      error: getErrorMessage(error, "Failed to update pairs"),
    });
  }
};

export const addTradingStep = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const { step } = req.body;
  console.log(step);
  try {
    const existing = await getExistingSystem(supabase);

    if (!existing) {
      return res.status(404).json({ error: "Trading system not found" });
    }

    const currentSteps = parseTextArray(existing.steps);
    const nextStep = String(step || "").trim();

    if (!nextStep) {
      return res.status(400).json({ error: "Step is required" });
    }

    const updatedSteps = [...currentSteps, nextStep];

    const updated = await updateSystemRow(supabase, existing.id, {
      steps: updatedSteps,
    });

    return res.json(formatTradingSystem(updated));
  } catch (error: unknown) {
    return res.status(500).json({
      error: getErrorMessage(error, "Failed to add step"),
    });
  }
};

export const removeTradingStep = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const { index } = req.body;

  try {
    const existing = await getExistingSystem(supabase);

    if (!existing) {
      return res.status(404).json({ error: "Trading system not found" });
    }

    const currentSteps = parseTextArray(existing.steps);
    const updatedSteps = currentSteps.filter((_, i) => i !== Number(index));
    const updated = await updateSystemRow(supabase, existing.id, {
      steps: updatedSteps,
    });

    return res.json(formatTradingSystem(updated));
  } catch (error: unknown) {
    return res.status(500).json({
      error: getErrorMessage(error, "Failed to remove step"),
    });
  }
};

export const updateTradingSteps = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const { steps } = req.body;

  try {
    const existing = await getExistingSystem(supabase);

    if (!existing) {
      return res.status(404).json({ error: "Trading system not found" });
    }

    const updatedSteps = Array.isArray(steps)
      ? steps.map((step) => String(step).trim()).filter(Boolean)
      : [];

    const updated = await updateSystemRow(supabase, existing.id, {
      steps: updatedSteps,
    });

    return res.json(formatTradingSystem(updated));
  } catch (error: unknown) {
    return res.status(500).json({
      error: getErrorMessage(error, "Failed to update steps"),
    });
  }
};

export const addTradingCriterion = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const { criterion } = req.body;

  try {
    const existing = await getExistingSystem(supabase);

    if (!existing) {
      return res.status(404).json({ error: "Trading system not found" });
    }

    const currentCriteria = parseCriteria(existing.criteria);
    const nextCriterion = criterion as SystemCriterion;

    if (!nextCriterion?.id || !nextCriterion?.label) {
      return res.status(400).json({ error: "Valid criterion is required" });
    }

    const alreadyExists = currentCriteria.some(
      (item) => item.id === nextCriterion.id
    );

    const updatedCriteria = alreadyExists
      ? currentCriteria
      : [...currentCriteria, nextCriterion];

    const updated = await updateSystemRow(supabase, existing.id, {
      criteria: updatedCriteria,
    });

    return res.json(formatTradingSystem(updated));
  } catch (error: unknown) {
    return res.status(500).json({
      error: getErrorMessage(error, "Failed to add criterion"),
    });
  }
};

export const removeTradingCriterion = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const { id } = req.body;

  try {
    const existing = await getExistingSystem(supabase);

    if (!existing) {
      return res.status(404).json({ error: "Trading system not found" });
    }

    const currentCriteria = parseCriteria(existing.criteria);
    const updatedCriteria = currentCriteria.filter((item) => item.id !== id);

    const updated = await updateSystemRow(supabase, existing.id, {
      criteria: updatedCriteria,
    });

    return res.json(formatTradingSystem(updated));
  } catch (error: unknown) {
    return res.status(500).json({
      error: getErrorMessage(error, "Failed to remove criterion"),
    });
  }
};

export const updateTradingCriteria = async (req: Request, res: Response) => {
  const supabase = supabaseFromReq(req);
  const { criteria } = req.body;

  try {
    const existing = await getExistingSystem(supabase);

    if (!existing) {
      return res.status(404).json({ error: "Trading system not found" });
    }

    const updatedCriteria = Array.isArray(criteria) ? criteria : [];

    const updated = await updateSystemRow(supabase, existing.id, {
      criteria: updatedCriteria,
    });

    return res.json(formatTradingSystem(updated));
  } catch (error: unknown) {
    return res.status(500).json({
      error: getErrorMessage(error, "Failed to update criteria"),
    });
  }
};
