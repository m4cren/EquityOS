type TimeDiff = {
  days: number;
  hours: number;
  minutes: number;
  totalMinutes: number;
};
export type DiffResult = {
  text: string;
  totalMinutes: number;
  isOverdue: boolean;
};
export type DiffProgress = {
  text: string;

  // live
  remainingMinutes: number;

  // static
  totalMinutes: number;

  // derived
  elapsedMinutes: number;
  progress: number; // 0 → 1
  isOverdue: boolean;
};

export function diffDates(
  date1: Date | string,
  date2: Date | string
): TimeDiff {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  const totalMinutes = Math.floor(diffMs / 60000);

  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return {
    days,
    hours,
    minutes,
    totalMinutes,
  };
}
export function diffToRemainingText(from: Date | string, to: Date | string) {
  const { days, hours, minutes } = diffDates(from, to);

  const parts = [];

  if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes || parts.length === 0)
    parts.push(`${minutes} min${minutes > 1 ? "s" : ""}`);

  return parts.join(", ") + " remaining";
}
function toDate(d: Date | string) {
  const s = String(d);
  return new Date(s.includes("Z") || s.includes("+") ? s : s + "Z");
}

export function diffStatus(
  now: Date | string,
  deadline: Date | string
): DiffResult {
  const n = toDate(now).getTime();
  const d = toDate(deadline).getTime();

  if (isNaN(n) || isNaN(d)) {
    return { text: "Invalid date", totalMinutes: 0, isOverdue: false };
  }

  const diffMs = d - n;
  const totalMinutes = Math.floor(diffMs / 60000);

  if (totalMinutes < 0) {
    return {
      text: "Overdue",
      totalMinutes: Math.abs(totalMinutes),
      isOverdue: true,
    };
  }

  const { days, hours, minutes } = diffDates(now, deadline);

  if (days >= 1) {
    return {
      text: `${days} day${days > 1 ? "s" : ""} remaining`,
      totalMinutes,
      isOverdue: false,
    };
  }

  const parts = [];
  if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes || parts.length === 0)
    parts.push(`${minutes} min${minutes > 1 ? "s" : ""}`);

  return {
    text: parts.join(", ") + " remaining",
    totalMinutes,
    isOverdue: false,
  };
}
export function diffProgress(
  created: Date | string,
  now: Date | string,
  deadline: Date | string
): DiffProgress {
  const c = toDate(created).getTime();
  const n = toDate(now).getTime();
  const d = toDate(deadline).getTime();

  if ([c, n, d].some(isNaN)) {
    return {
      text: "Invalid date",
      remainingMinutes: 0,
      totalMinutes: 0,
      elapsedMinutes: 0,
      progress: 0,
      isOverdue: false,
    };
  }

  const total = Math.max(1, Math.floor((d - c) / 60000));
  const remaining = Math.max(0, Math.floor((d - n) / 60000));
  const elapsed = Math.max(0, total - remaining);

  const progress = Math.min(1, elapsed / total);
  const isOverdue = n > d;

  // display text (reuse your logic)
  const { days, hours, minutes } = diffDates(new Date(n), new Date(d));

  let text = "Overdue";
  if (!isOverdue) {
    if (days >= 1) text = `${days} day${days > 1 ? "s" : ""} remaining`;
    else {
      const parts = [];
      if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
      if (minutes || parts.length === 0)
        parts.push(`${minutes} min${minutes > 1 ? "s" : ""}`);
      text = parts.join(", ") + " remaining";
    }
  }

  return {
    text,
    remainingMinutes: remaining,
    totalMinutes: total,
    elapsedMinutes: elapsed,
    progress,
    isOverdue,
  };
}
