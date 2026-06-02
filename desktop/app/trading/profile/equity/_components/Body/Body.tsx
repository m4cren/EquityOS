"use client";

import { useTradeAccount } from "@/store/tradeAccount/useTradeAccount";
import { useTradeHistory } from "@/store/tradeHistory/useTradeHistory";
import { fetchTradingEquity } from "@/store/tradingEquitySlice/controller";
import { useRecordTradingEquity } from "@/store/tradingEquitySlice/useRecordTradingEquity";
import { useResetMonthlyEquity } from "@/store/tradingEquitySlice/useResetMonthlyEquity";
import { useTradingEquity } from "@/store/tradingEquitySlice/useTradingEquity";
import { sort } from "fast-sort";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartTab = "Equity" | "Net Profit";
type FilterType = "Weekly" | "Monthly" | "Yearly";

type EquityChartData = {
  date_str: string;
  equity: number;
};

type NetProfitChartData = {
  date_str: string;
  net_profit: number;
};

type TradingEquityPoint = {
  date_str: string;
  equity: number;
};

type NormalizedTradePoint = {
  date_str: string;
  pnl_in_usd: number;
};

type CustomTooltipPayloadItem = {
  value?: number | string;
  dataKey?: string | number;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: CustomTooltipPayloadItem[];
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  const rawValue = payload[0]?.value;
  const value = typeof rawValue === "number" ? rawValue : Number(rawValue ?? 0);

  const rawDataKey = payload[0]?.dataKey;
  const dataKey =
    typeof rawDataKey === "string" ? rawDataKey : String(rawDataKey ?? "");

  const isProfit = dataKey === "net_profit";

  return (
    <div className="rounded-md border border-white/10 bg-[#0f0f0f] px-3 py-2 shadow-lg">
      <p className="mb-1 text-xs text-white/50">{label}</p>

      <p
        className={`text-sm font-semibold ${
          isProfit
            ? value >= 0
              ? "text-green-400"
              : "text-red-400"
            : "text-white"
        }`}
      >
        {isProfit
          ? `${value >= 0 ? "+" : ""}$${value.toLocaleString()}`
          : `$${value.toLocaleString()}`}
      </p>
    </div>
  );
};

const Body = () => {
  useRecordTradingEquity();
  useResetMonthlyEquity();
  const [activeTab, setActiveTab] = useState<ChartTab>("Equity");
  const [filter, setFilter] = useState<FilterType>("Monthly");

  const { dispatch, tradingEquity, isPending } = useTradingEquity();
  const { tradeAccount, selectedTradeAcc } = useTradeAccount();
  const { tradeHistory } = useTradeHistory();

  const selectedAccount = tradeAccount.find(
    (acc) => acc.acc_name === selectedTradeAcc
  );

  useEffect(() => {
    if (!selectedAccount?.acc_id) return;

    dispatch(fetchTradingEquity({ trading_acc_id: selectedAccount.acc_id }));
  }, [dispatch, selectedAccount?.acc_id]);

  const sortedEquity = useMemo(() => {
    return sort(tradingEquity).asc((item) => new Date(item.date_str).getTime());
  }, [tradingEquity]);

  const equityWithBase = useMemo(() => {
    if (!selectedAccount) return [] as TradingEquityPoint[];

    if (!sortedEquity.length) {
      return [
        {
          date_str: new Date().toISOString().slice(0, 10),
          equity: selectedAccount.base_equity,
        },
      ];
    }

    const firstRecordedDate = sortedEquity[0].date_str;
    const baseDate = new Date(firstRecordedDate);
    baseDate.setDate(baseDate.getDate() - 1);

    return [
      {
        date_str: baseDate.toISOString().slice(0, 10),
        equity: selectedAccount.base_equity,
      },
      ...sortedEquity.map((item) => ({
        date_str: item.date_str,
        equity: item.equity,
      })),
    ];
  }, [selectedAccount, sortedEquity]);

  const normalizedTradeHistory = useMemo(() => {
    return sort(
      tradeHistory
        .filter((trade) => trade.closeTime)
        .map((trade) => {
          const matchedAccount = trade.accounts?.find(
            (acc) => acc.account === selectedTradeAcc
          );

          const pnlInUsd =
            typeof matchedAccount?.pnl_in_usd === "number"
              ? matchedAccount.pnl_in_usd
              : 0;

          return {
            date_str: trade.closeTime ?? trade.openTime,
            pnl_in_usd: pnlInUsd,
          };
        })
        .filter(
          (trade) =>
            Boolean(trade.date_str) &&
            !Number.isNaN(new Date(trade.date_str).getTime())
        )
    ).asc((item) =>
      new Date(item.date_str).getTime()
    ) as NormalizedTradePoint[];
  }, [tradeHistory, selectedTradeAcc]);

  const chartData = useMemo(() => {
    const formatDayLabel = (dateStr: string) =>
      new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

    const formatMonthLabel = (dateStr: string) =>
      new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

    const formatYearLabel = (dateStr: string) =>
      new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
      });

    if (activeTab === "Equity") {
      const equitySource = equityWithBase;

      if (!equitySource.length) return [];

      if (filter === "Weekly") {
        return equitySource.map((item) => ({
          date_str: formatDayLabel(item.date_str),
          equity: item.equity,
        })) as EquityChartData[];
      }

      if (filter === "Monthly") {
        const monthlyClosing = Object.values(
          equitySource.reduce((acc, curr) => {
            const key = new Date(curr.date_str).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            });

            const stored = acc[key];

            if (
              !stored ||
              new Date(curr.date_str) > new Date(stored.date_str)
            ) {
              acc[key] = curr;
            }

            return acc;
          }, {} as Record<string, (typeof equitySource)[number]>)
        );

        const sortedMonthlyClosing = sort(monthlyClosing).asc((item) =>
          new Date(item.date_str).getTime()
        );

        return sortedMonthlyClosing.map((item) => ({
          date_str: formatMonthLabel(item.date_str),
          equity: item.equity,
        })) as EquityChartData[];
      }

      const yearlyClosing = Object.values(
        equitySource.reduce((acc, curr) => {
          const key = new Date(curr.date_str).toLocaleDateString("en-US", {
            year: "numeric",
          });

          const stored = acc[key];

          if (!stored || new Date(curr.date_str) > new Date(stored.date_str)) {
            acc[key] = curr;
          }

          return acc;
        }, {} as Record<string, (typeof equitySource)[number]>)
      );

      const sortedYearlyClosing = sort(yearlyClosing).asc((item) =>
        new Date(item.date_str).getTime()
      );

      return sortedYearlyClosing.map((item) => ({
        date_str: formatYearLabel(item.date_str),
        equity: item.equity,
      })) as EquityChartData[];
    }

    const tradeSource = normalizedTradeHistory;

    if (!tradeSource.length) return [];

    if (filter === "Weekly") {
      const dailyProfitMap = tradeSource.reduce((acc, curr) => {
        const key = new Date(curr.date_str).toISOString().slice(0, 10);

        if (!acc[key]) {
          acc[key] = {
            date_str: key,
            net_profit: 0,
          };
        }

        acc[key].net_profit += curr.pnl_in_usd;

        return acc;
      }, {} as Record<string, { date_str: string; net_profit: number }>);

      return sort(Object.values(dailyProfitMap))
        .asc((item) => new Date(item.date_str).getTime())
        .map((item) => ({
          date_str: formatDayLabel(item.date_str),
          net_profit: item.net_profit,
        })) as NetProfitChartData[];
    }

    if (filter === "Monthly") {
      const monthlyProfitMap = tradeSource.reduce((acc, curr) => {
        const date = new Date(curr.date_str);
        const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

        if (!acc[key]) {
          acc[key] = {
            date_str: curr.date_str,
            net_profit: 0,
          };
        }

        acc[key].net_profit += curr.pnl_in_usd;

        return acc;
      }, {} as Record<string, { date_str: string; net_profit: number }>);

      return sort(Object.values(monthlyProfitMap))
        .asc((item) => new Date(item.date_str).getTime())
        .map((item) => ({
          date_str: formatMonthLabel(item.date_str),
          net_profit: item.net_profit,
        })) as NetProfitChartData[];
    }

    const yearlyProfitMap = tradeSource.reduce((acc, curr) => {
      const date = new Date(curr.date_str);
      const key = String(date.getFullYear());

      if (!acc[key]) {
        acc[key] = {
          date_str: curr.date_str,
          net_profit: 0,
        };
      }

      acc[key].net_profit += curr.pnl_in_usd;

      return acc;
    }, {} as Record<string, { date_str: string; net_profit: number }>);

    return sort(Object.values(yearlyProfitMap))
      .asc((item) => new Date(item.date_str).getTime())
      .map((item) => ({
        date_str: formatYearLabel(item.date_str),
        net_profit: item.net_profit,
      })) as NetProfitChartData[];
  }, [activeTab, filter, equityWithBase, normalizedTradeHistory]);

  return (
    <div className="w-full flex flex-col gap-4">
      <h5 className="text-xl font-semibold">Charts</h5>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <ul className="border flex w-fit p-2 text-xs font-semibold gap-2 border-card rounded-md">
          <li
            onClick={() => setActiveTab("Equity")}
            className={`px-3 cursor-pointer py-1 rounded-sm transition ${
              activeTab === "Equity" ? "bg-card" : ""
            }`}
          >
            Equity
          </li>
          <li
            onClick={() => setActiveTab("Net Profit")}
            className={`px-3 cursor-pointer py-1 rounded-sm transition ${
              activeTab === "Net Profit" ? "bg-card" : ""
            }`}
          >
            Net Profit
          </li>
        </ul>

        <ul className="border flex w-fit p-2 text-xs font-semibold gap-2 border-card rounded-md">
          <li
            onClick={() => setFilter("Weekly")}
            className={`px-3 cursor-pointer py-1 rounded-sm transition ${
              filter === "Weekly" ? "bg-card" : ""
            }`}
          >
            Weekly
          </li>
          <li
            onClick={() => setFilter("Monthly")}
            className={`px-3 cursor-pointer py-1 rounded-sm transition ${
              filter === "Monthly" ? "bg-card" : ""
            }`}
          >
            Monthly
          </li>
          <li
            onClick={() => setFilter("Yearly")}
            className={`px-3 cursor-pointer py-1 rounded-sm transition ${
              filter === "Yearly" ? "bg-card" : ""
            }`}
          >
            Yearly
          </li>
        </ul>
      </div>

      <div className="w-full h-[420px]">
        {isPending ? (
          <div className="w-full h-full rounded-xl bg-card animate-pulse" />
        ) : chartData.length === 0 ? (
          <div className="w-full h-full rounded-xl border border-card flex items-center justify-center text-sm text-white/50">
            No chart data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === "Equity" ? (
              <LineChart data={chartData}>
                <CartesianGrid vertical={false} opacity={0.1} />
                <XAxis dataKey="date_str" />
                <YAxis />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Line
                  type="monotone"
                  dataKey="equity"
                  stroke="#d4d4d4"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} opacity={0.1} />
                <XAxis dataKey="date_str" />
                <YAxis
                  domain={([dataMin, dataMax]: readonly [number, number]) => {
                    const max = Math.max(Math.abs(dataMin), Math.abs(dataMax));
                    const safeMax = max === 0 ? 1 : max;

                    return [-safeMax * 0.25, safeMax] as [number, number];
                  }}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="net_profit" radius={[4, 4, 0, 0]}>
                  {(chartData as NetProfitChartData[]).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.net_profit > 0
                          ? "#16a34a"
                          : entry.net_profit < 0
                          ? "#dc2626"
                          : "#64748b"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Body;
