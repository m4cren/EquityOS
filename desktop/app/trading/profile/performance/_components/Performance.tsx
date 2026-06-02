"use client";

import { useTradeAccount } from "@/store/tradeAccount/useTradeAccount";
import { useTradeHistory } from "@/store/tradeHistory/useTradeHistory";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const weekdayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const BASE_EQUITY = 2500;

const getWeekday = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", { weekday: "short" });

const average = (values: number[]) =>
  values.length
    ? values.reduce((sum, value) => sum + value, 0) / values.length
    : 0;

const formatDuration = (minutes: number) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins.toFixed(1)}m`;
};

const Performance = () => {
  const { selectedTradeAcc } = useTradeAccount();
  const { tradeHistory } = useTradeHistory();

  const normalizedTrades = useMemo(() => {
    return tradeHistory
      .map((t) => {
        const acc = t.accounts?.find((a) => a.account === selectedTradeAcc);

        if (!acc) return null;

        return {
          ...t,
          pnlUsd: acc.pnl_in_usd ?? 0,
        };
      })
      .filter(Boolean);
  }, [tradeHistory, selectedTradeAcc]);

  const stats = useMemo(() => {
    const trades = normalizedTrades;

    const wins = trades.filter((t) => t!.pnlUsd > 0);
    const losses = trades.filter((t) => t!.pnlUsd < 0);

    const totalTrades = trades.length;
    const totalWins = wins.length;
    const totalLosses = losses.length;

    const profitRate = totalTrades
      ? Math.round((totalWins / totalTrades) * 100)
      : 0;

    const totalUsd = trades.reduce((sum, t) => sum + t!.pnlUsd, 0);

    const shortWins = wins.filter((t) => t!.type === "Short").length;
    const longWins = wins.filter((t) => t!.type === "Long").length;

    const shortWinShare = totalWins
      ? Math.round((shortWins / totalWins) * 100)
      : 0;

    const longWinShare = totalWins
      ? Math.round((longWins / totalWins) * 100)
      : 0;

    const sorted = [...trades].sort(
      (a, b) =>
        new Date(a!.openTime).getTime() - new Date(b!.openTime).getTime()
    );

    let equity = BASE_EQUITY;
    let peak = BASE_EQUITY;
    let maxDD = 0;
    let maxDDPct = 0;

    let winStreak = 0;
    let lossStreak = 0;
    let maxWin = 0;
    let maxLoss = 0;

    for (const t of sorted) {
      const pnl = t!.pnlUsd;

      if (pnl > 0) {
        winStreak++;
        lossStreak = 0;
      } else if (pnl < 0) {
        lossStreak++;
        winStreak = 0;
      }

      maxWin = Math.max(maxWin, winStreak);
      maxLoss = Math.max(maxLoss, lossStreak);

      equity += pnl;
      peak = Math.max(peak, equity);

      const dd = peak - equity;
      const ddPct = peak ? (dd / peak) * 100 : 0;

      maxDD = Math.max(maxDD, dd);
      maxDDPct = Math.max(maxDDPct, ddPct);
    }

    const avgTradeMinutes = average(
      trades
        .filter((t) => t!.closeTime)
        .map((t) => {
          const open = new Date(t!.openTime).getTime();
          const close = new Date(t!.closeTime as string).getTime();
          return Math.max(0, Math.round((close - open) / 60000));
        })
    );

    return {
      profitRate,
      totalTrades,
      totalWins,
      totalLosses,
      totalUsd,

      shortWinShare,
      longWinShare,
      maxWinStreak: maxWin,
      maxLossStreak: maxLoss,
      maxDrawdownUsd: maxDD,
      maxDrawdownPct: maxDDPct,
      avgTradeMinutes,
    };
  }, [normalizedTrades]);

  const expectancyR = useMemo(() => {
    const trades = normalizedTrades;

    const validTrades = trades.filter((t) => t!.pnl! !== 0);

    const totalR = validTrades.reduce((sum, t) => {
      const risk = t!.risk || 1;
      const r = t!.pnl! / risk;
      return sum + r;
    }, 0);

    return validTrades.length ? totalR / validTrades.length : 0;
  }, [normalizedTrades]);

  const weeklyTradeData = useMemo(() => {
    const base = weekdayOrder.map((day) => ({
      day,
      trades: 0,
      wins: 0,
      losses: 0,
    }));

    for (const trade of normalizedTrades) {
      const day = getWeekday(trade!.openTime);
      const row = base.find((d) => d.day === day);
      if (!row) continue;

      row.trades += 1;
      if (trade!.pnlUsd > 0) row.wins += 1;
      if (trade!.pnlUsd < 0) row.losses += 1;
    }

    return base;
  }, [normalizedTrades]);

  const bestDay = useMemo(
    () => [...weeklyTradeData].sort((a, b) => b.wins - a.wins)[0],
    [weeklyTradeData]
  );

  const worstDay = useMemo(
    () => [...weeklyTradeData].sort((a, b) => b.losses - a.losses)[0],
    [weeklyTradeData]
  );

  return (
    <div className="flex flex-col gap-12">
      <div className="grid grid-cols-2 gap-12 text-white">
        <div className="flex flex-col gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
          <div className="flex flex-col items-center gap-3">
            <div
              className="flex h-32 w-32 items-center justify-center rounded-full transition-all duration-300"
              style={{
                background: `conic-gradient(#C06D03 ${
                  stats.profitRate * 3.6
                }deg, #3A2408 0deg)`,
              }}
            >
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0A0A0A] text-2xl font-bold">
                {stats.profitRate}%
              </span>
            </div>

            <p className="text-sm tracking-wide text-white/60">PROFIT RATE</p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <h5 className="text-3xl font-bold">{expectancyR.toFixed(2)}R</h5>
              <p className="text-xs text-white/60">EXPECTANCY</p>
            </div>
            <div>
              <h5 className="text-3xl font-bold">{stats.totalTrades}</h5>
              <p className="text-xs text-white/60">Closed Orders</p>
            </div>

            <div>
              <h5 className="text-xl font-semibold text-green-400">
                {stats.totalWins}
              </h5>
              <p className="text-xs text-white/60">Profits</p>
            </div>

            <div>
              <h5 className="text-xl font-semibold text-red-400">
                {stats.totalLosses}
              </h5>
              <p className="text-xs text-white/60">Expenses</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
          <div className="text-center">
            <h5 className="text-3xl font-bold">Net Profit</h5>
            <p
              className={`text-xl font-medium ${
                stats.totalUsd >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {stats.totalUsd >= 0 ? "+" : ""}
              {stats.totalUsd.toFixed(2)} USD
            </p>
          </div>

          <div className="flex justify-between text-sm">
            <div>
              <p className="text-white/60">Longest Profit Streak</p>
              <p className="text-lg font-semibold text-green-400">
                {stats.maxWinStreak}
              </p>
            </div>

            <div>
              <p className="text-white/60">Longest Expense Streak</p>
              <p className="text-lg font-semibold text-red-400">
                {stats.maxLossStreak}
              </p>
            </div>
          </div>

          <div className="text-center">
            <h5 className="text-3xl font-bold">
              {formatDuration(stats.avgTradeMinutes)}
            </h5>
            <p className="text-sm text-white/60">AVG Trade Time</p>
          </div>

          <div className="flex justify-between text-sm">
            <div>
              <p className="text-white/60">Total PnL</p>
              <p className="text-lg font-semibold">
                {stats.totalUsd.toFixed(2)} USD
              </p>
            </div>

            <div>
              <p className="text-white/60">Expectancy</p>
              <p className="text-lg font-semibold">{expectancyR.toFixed(2)}R</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-white backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-2xl font-bold">Performance Breakdown</h4>
            <p className="text-sm text-white/50">
              Filtered by account: {selectedTradeAcc}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm">
            <p className="text-white/50">Best / Worst Day</p>
            <p className="font-semibold">
              {bestDay?.day || "—"} / {worstDay?.day || "—"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="mb-4 text-sm text-white/50">Directional Edge</p>

            <div className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>Short</span>
                  <span className="font-semibold">{stats.shortWinShare}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${stats.shortWinShare}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>Long</span>
                  <span className="font-semibold">{stats.longWinShare}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white/40"
                    style={{ width: `${stats.longWinShare}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="mb-4 text-sm text-white/50">Day Performance</p>

            <div className="space-y-4">
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs text-white/50">Best Winning Day</p>
                <p className="text-lg font-semibold text-green-400">
                  {bestDay?.day || "—"}
                </p>
                <p className="text-sm text-white/60">
                  {bestDay?.wins || 0} winning trades
                </p>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs text-white/50">Highest Losing Day</p>
                <p className="text-lg font-semibold text-red-400">
                  {worstDay?.day || "—"}
                </p>
                <p className="text-sm text-white/60">
                  {worstDay?.losses || 0} losing trades
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="mb-4 text-sm text-white/50">Execution Notes</p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between rounded-lg bg-white/5 px-3 py-2">
                <span>Selected Account</span>
                <span>{selectedTradeAcc}</span>
              </div>

              <div className="flex justify-between rounded-lg bg-white/5 px-3 py-2">
                <span>Max Drawdown</span>
                <span className="text-red-400">
                  {stats.maxDrawdownPct.toFixed(2)}%
                </span>
              </div>

              <div className="flex justify-between rounded-lg bg-white/5 px-3 py-2">
                <span>Drawdown in USD</span>
                <span className="text-red-400">
                  {stats.maxDrawdownUsd.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="mb-4">
            <p className="text-sm text-white/50">Daily Trade Count</p>
            <h5 className="text-lg font-semibold">
              Total trades taken per weekday
            </h5>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTradeData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" />
                <YAxis allowDecimals={false} stroke="rgba(255,255,255,0.4)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "white",
                  }}
                />
                <Bar dataKey="trades" radius={[8, 8, 0, 0]} fill="#C06D03" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
