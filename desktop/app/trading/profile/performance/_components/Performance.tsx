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
  return `${hrs}h ${mins}m`;
};

const Performance = () => {
  const { selectedTradeAcc } = useTradeAccount();
  const { tradeHistory } = useTradeHistory();

  const filteredTrades = useMemo(() => {
    return tradeHistory.filter((trade) =>
      trade.accounts.includes(selectedTradeAcc)
    );
  }, [tradeHistory, selectedTradeAcc]);

  const stats = useMemo(() => {
    const wins = filteredTrades.filter((trade) => (trade.pnl ?? 0) > 0);
    const losses = filteredTrades.filter((trade) => (trade.pnl ?? 0) < 0);

    const totalTrades = filteredTrades.length;
    const totalWins = wins.length;
    const totalLosses = losses.length;

    const profitRate = totalTrades
      ? Math.round((totalWins / totalTrades) * 100)
      : 0;

    const avgRRR = average(wins.map((trade) => trade.pnl ?? 0));
    const totalR = filteredTrades.reduce(
      (sum, trade) => sum + (trade.pnl ?? 0),
      0
    );
    const expectancy = totalTrades ? totalR / totalTrades : 0;

    const totalUsd = filteredTrades.reduce(
      (sum, trade) => sum + (trade.pnl_in_usd ?? 0),
      0
    );

    const shortWins = wins.filter((trade) => trade.type === "Short").length;
    const longWins = wins.filter((trade) => trade.type === "Long").length;

    const shortWinShare = totalWins
      ? Math.round((shortWins / totalWins) * 100)
      : 0;

    const longWinShare = totalWins
      ? Math.round((longWins / totalWins) * 100)
      : 0;

    const durations = filteredTrades
      .filter((trade) => trade.closeTime)
      .map((trade) => {
        const open = new Date(trade.openTime).getTime();
        const close = new Date(trade.closeTime as string).getTime();
        return Math.max(0, Math.round((close - open) / 60000));
      });

    const avgTradeMinutes = Math.round(average(durations));

    const sorted = [...filteredTrades].sort(
      (a, b) => new Date(a.openTime).getTime() - new Date(b.openTime).getTime()
    );

    let currentWinStreak = 0;
    let currentLossStreak = 0;
    let maxWinStreak = 0;
    let maxLossStreak = 0;

    let equity = BASE_EQUITY;
    let peakEquity = BASE_EQUITY;
    let maxDrawdownUsd = 0;
    let maxDrawdownPct = 0;

    for (const trade of sorted) {
      const pnlR = trade.pnl ?? 0;
      const pnlUsd = trade.pnl_in_usd ?? 0;

      if (pnlR > 0) {
        currentWinStreak += 1;
        currentLossStreak = 0;
      } else if (pnlR < 0) {
        currentLossStreak += 1;
        currentWinStreak = 0;
      }

      if (currentWinStreak > maxWinStreak) {
        maxWinStreak = currentWinStreak;
      }

      if (currentLossStreak > maxLossStreak) {
        maxLossStreak = currentLossStreak;
      }

      equity += pnlUsd;

      if (equity > peakEquity) {
        peakEquity = equity;
      }

      const drawdownUsd = peakEquity - equity;
      const drawdownPct = peakEquity ? (drawdownUsd / peakEquity) * 100 : 0;

      if (drawdownUsd > maxDrawdownUsd) {
        maxDrawdownUsd = drawdownUsd;
      }

      if (drawdownPct > maxDrawdownPct) {
        maxDrawdownPct = drawdownPct;
      }
    }

    return {
      profitRate,
      avgRRR,
      totalTrades,
      totalWins,
      totalLosses,
      totalR,
      expectancy,
      totalUsd,
      shortWinShare,
      longWinShare,
      avgTradeMinutes,
      maxWinStreak,
      maxLossStreak,
      maxDrawdownUsd,
      maxDrawdownPct,
    };
  }, [filteredTrades]);

  const weeklyTradeData = useMemo(() => {
    const base = weekdayOrder.map((day) => ({
      day,
      trades: 0,
      wins: 0,
      losses: 0,
    }));

    for (const trade of filteredTrades) {
      const day = getWeekday(trade.openTime);
      const row = base.find((item) => item.day === day);

      if (!row) continue;

      row.trades += 1;
      if ((trade.pnl ?? 0) > 0) row.wins += 1;
      if ((trade.pnl ?? 0) < 0) row.losses += 1;
    }

    return base;
  }, [filteredTrades]);

  const bestDay = useMemo(() => {
    return [...weeklyTradeData].sort((a, b) => b.wins - a.wins)[0];
  }, [weeklyTradeData]);

  const worstDay = useMemo(() => {
    return [...weeklyTradeData].sort((a, b) => b.losses - a.losses)[0];
  }, [weeklyTradeData]);

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
              <h5 className="text-3xl font-bold">
                {stats.avgRRR ? `${stats.avgRRR.toFixed(2)}R` : "0R"}
              </h5>
              <p className="text-xs text-white/60">AVG RRR</p>
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
              <p className="text-white/60">Net R</p>
              <p className="text-lg font-semibold">
                {stats.totalR.toFixed(2)}R
              </p>
            </div>

            <div>
              <p className="text-white/60">Expectancy</p>
              <p className="text-lg font-semibold">
                {stats.expectancy.toFixed(2)}R
              </p>
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
