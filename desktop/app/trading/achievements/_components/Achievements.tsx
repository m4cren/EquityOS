"use client";

import React, { useMemo } from "react";
import { Eye, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { useTradeLevel } from "@/store/tradeLevel/useTradeLevel";
import { useTradeHistory } from "@/store/tradeHistory/useTradeHistory";
import { useTradeAccount } from "@/store/tradeAccount/useTradeAccount";

const levels = [
  {
    tier: 1,
    tierName: "Foundation",
    level: 1,
    roman: "I",
    title: "Novice Trader",
    xp: 0,
  },
  {
    tier: 1,
    tierName: "Foundation",
    level: 2,
    roman: "II",
    title: "Structured Trader",
    xp: 300,
  },
  {
    tier: 1,
    tierName: "Foundation",
    level: 3,
    roman: "III",
    title: "Rule-Based Trader",
    xp: 800,
  },
  {
    tier: 2,
    tierName: "Discipline",
    level: 4,
    roman: "IV",
    title: "Disciplined Operator",
    xp: 1800,
  },
  {
    tier: 2,
    tierName: "Discipline",
    level: 5,
    roman: "V",
    title: "Risk Controller",
    xp: 3500,
  },
  {
    tier: 2,
    tierName: "Discipline",
    level: 6,
    roman: "VI",
    title: "Consistent Performer",
    xp: 6000,
  },
  {
    tier: 3,
    tierName: "Professional Identity",
    level: 7,
    roman: "VII",
    title: "Advanced Strategist",
    xp: 10000,
  },
  {
    tier: 3,
    tierName: "Professional Identity",
    level: 8,
    roman: "VIII",
    title: "Elite Executor",
    xp: 15000,
  },
  {
    tier: 3,
    tierName: "Professional Identity",
    level: 9,
    roman: "IX",
    title: "Professional Trader",
    xp: 22000,
  },
  {
    tier: 4,
    tierName: "Mastery",
    level: 10,
    roman: "X",
    title: "Master Operator",
    xp: 35000,
  },
];

const tierTheme: Record<
  number,
  {
    text: string;
    bg: string;
    border: string;
    glow: string;
    bar: string;
    cardBg: string;
  }
> = {
  1: {
    text: "text-[#56d364]",
    bg: "bg-[#56d364]/10",
    border: "border-[#56d364]/30",
    glow: "shadow-[0_0_28px_rgba(86,211,100,0.35)]",
    bar: "bg-[linear-gradient(90deg,#238636,#56d364)]",
    cardBg:
      "bg-[radial-gradient(circle_at_30%_35%,rgba(86,211,100,0.18),transparent_38%),radial-gradient(circle_at_75%_20%,rgba(86,211,100,0.08),transparent_28%)]",
  },
  2: {
    text: "text-[#c084fc]",
    bg: "bg-[#a855f7]/10",
    border: "border-[#a855f7]/30",
    glow: "shadow-[0_0_28px_rgba(168,85,247,0.35)]",
    bar: "bg-[linear-gradient(90deg,#7c3aed,#c084fc)]",
    cardBg:
      "bg-[radial-gradient(circle_at_30%_35%,rgba(168,85,247,0.18),transparent_38%),radial-gradient(circle_at_75%_20%,rgba(192,132,252,0.08),transparent_28%)]",
  },
  3: {
    text: "text-[#60a5fa]",
    bg: "bg-[#2563eb]/10",
    border: "border-[#60a5fa]/30",
    glow: "shadow-[0_0_28px_rgba(96,165,250,0.35)]",
    bar: "bg-[linear-gradient(90deg,#2563eb,#60a5fa)]",
    cardBg:
      "bg-[radial-gradient(circle_at_30%_35%,rgba(96,165,250,0.18),transparent_38%),radial-gradient(circle_at_75%_20%,rgba(37,99,235,0.1),transparent_28%)]",
  },
  4: {
    text: "text-[#f5b332]",
    bg: "bg-[#f5b332]/10",
    border: "border-[#f5b332]/30",
    glow: "shadow-[0_0_28px_rgba(245,179,50,0.35)]",
    bar: "bg-[linear-gradient(90deg,#f59e0b,#f5b332)]",
    cardBg:
      "bg-[radial-gradient(circle_at_30%_35%,rgba(245,179,50,0.2),transparent_38%),radial-gradient(circle_at_75%_20%,rgba(245,158,11,0.1),transparent_28%)]",
  },
};

function Card({
  children,
  className = "",
  themeBg,
}: {
  children: React.ReactNode;
  className?: string;
  themeBg?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(7,12,28,0.72)] shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] backdrop-blur-xl ${className}`}
    >
      {themeBg && <div className={`absolute inset-0 ${themeBg}`} />}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(0,0,0,0.12))]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function EquityProgressionUI() {
  const { xp_lvl } = useTradeLevel();
  const { tradeHistory } = useTradeHistory();
  const { selectedTradeAcc } = useTradeAccount();

  const tradeLogCount = useMemo(() => {
    return tradeHistory.filter((trade) => {
      const isClosedTrade = !!trade.closeTime;

      const hasSelectedAccount = trade.accounts?.some(
        (acc) => acc.account === selectedTradeAcc
      );

      return isClosedTrade && hasSelectedAccount;
    }).length;
  }, [tradeHistory, selectedTradeAcc]);

  const currentLevel =
    [...levels].reverse().find((item) => xp_lvl >= item.xp) || levels[0];

  const nextLevel = levels.find((item) => item.xp > xp_lvl);
  const theme = tierTheme[currentLevel.tier];

  const currentXpBase = currentLevel.xp;
  const nextXp = nextLevel?.xp ?? currentLevel.xp;

  const progressWidth = nextLevel
    ? `${Math.min(
        ((xp_lvl - currentXpBase) / (nextXp - currentXpBase)) * 100,
        100
      )}%`
    : "100%";

  const xpLeft = nextLevel ? nextLevel.xp - xp_lvl : 0;

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">
        <Card themeBg={theme.cardBg} className="p-8 lg:p-10">
          <div className="grid items-center gap-8 xl:grid-cols-[1.1fr_0.9fr_1fr]">
            <div>
              <h1 className="mt-5 text-6xl font-semibold tracking-tight">
                Level {currentLevel.roman}
              </h1>

              <h2
                className={`mt-3 text-5xl font-semibold tracking-tight ${theme.text}`}
              >
                {currentLevel.title}
              </h2>

              <div
                className={`mt-6 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-medium ${theme.bg} ${theme.border} ${theme.text}`}
              >
                <span className={`h-2 w-2 rounded-full ${theme.bg}`} />
                Tier {currentLevel.tier} · {currentLevel.tierName}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div
                className={`flex h-[220px] w-[220px] items-center justify-center rounded-full border ${theme.border} ${theme.bg} ${theme.glow}`}
              >
                <span
                  className={`text-[86px] font-semibold tracking-tight ${theme.text}`}
                >
                  {currentLevel.roman}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[13px] uppercase tracking-[0.24em] text-white/45">
                XP Progress
              </p>

              <div className="mt-5 flex items-end gap-3">
                <span className="text-5xl font-semibold tracking-tight">
                  {xp_lvl.toLocaleString()}
                </span>

                <span className="mb-1 text-2xl text-white/55">
                  / {nextLevel ? nextLevel.xp.toLocaleString() : "MAX"} XP
                </span>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${theme.bar}`}
                  style={{ width: progressWidth }}
                />
              </div>

              <p className="mt-4 text-lg text-white/52">
                {nextLevel
                  ? `${xpLeft.toLocaleString()} XP to next level`
                  : "Max level reached"}
              </p>
            </div>
          </div>
        </Card>

        <Card themeBg={theme.cardBg} className="mt-6 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-4 rounded-[24px] border border-white/8 bg-white/[0.03] px-5 py-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#a855f7]/20 bg-[#a855f7]/10 text-[#c084fc]">
                <Sparkles size={28} />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-white/38">
                  Total XP
                </p>
                <p className="mt-2 text-4xl font-semibold">
                  {xp_lvl.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-[24px] border border-white/8 bg-white/[0.03] px-5 py-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#60a5fa]/20 bg-[#60a5fa]/10 text-[#60a5fa]">
                <Eye size={28} />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-white/38">
                  Trade Logs
                </p>
                <p className="mt-2 text-4xl font-semibold">{tradeLogCount}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card themeBg={theme.cardBg} className="mt-6 p-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">
            Level Progression
          </p>

          <h2 className="mt-2 text-[28px] font-semibold tracking-tight">
            Roadmap
          </h2>

          <div className="mt-8 overflow-x-auto">
            <div className="min-w-[1300px]">
              <div className="relative grid grid-cols-10 gap-0">
                <div className="absolute left-[5%] right-[5%] top-7 h-[2px] bg-white/10" />

                {levels.map((item) => {
                  const itemTheme = tierTheme[item.tier];
                  const unlocked = xp_lvl >= item.xp;
                  const current = item.level === currentLevel.level;

                  return (
                    <div
                      key={item.level}
                      className="relative flex flex-col justify-between px-3 text-center"
                    >
                      <div>
                        <p
                          className={`text-sm uppercase tracking-[0.18em] ${itemTheme.text}`}
                        >
                          Tier {item.tier}
                        </p>

                        <p className="mt-2 text-lg text-white/48">
                          {item.tierName}
                        </p>

                        <div
                          className={`mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full border text-2xl font-semibold ${
                            current
                              ? `${itemTheme.border} ${itemTheme.bg} ${itemTheme.glow} text-white`
                              : unlocked
                              ? `${itemTheme.border} ${itemTheme.bg} text-white`
                              : "border-white/12 bg-white/[0.03] text-white/50"
                          }`}
                        >
                          {item.roman}
                        </div>

                        <p
                          className={`mt-5 text-md font-medium leading-tight ${
                            current
                              ? itemTheme.text
                              : unlocked
                              ? "text-white"
                              : "text-white/55"
                          }`}
                        >
                          {item.title}
                        </p>
                      </div>

                      <div>
                        <p className="mt-4 text-base text-white/42">
                          {item.xp.toLocaleString()} XP
                        </p>

                        <div className="mt-6 flex justify-center">
                          {!unlocked ? (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-white/45">
                              <Lock size={16} />
                            </div>
                          ) : current ? (
                            <span className="flex h-10 w-10 items-center justify-center">
                              <div
                                className={`h-4 w-4 rounded-full ${itemTheme.bg} ${itemTheme.glow}`}
                              />
                            </span>
                          ) : (
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full border ${itemTheme.border} ${itemTheme.bg} ${itemTheme.text}`}
                            >
                              <ShieldCheck size={16} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
