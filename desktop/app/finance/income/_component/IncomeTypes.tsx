"use client";

import { IncomeCategoryTypes } from "@/lib/types";
import { BanknoteArrowDownIcon } from "lucide-react";
import { useState } from "react";

export const incomeTypes: {
  type: IncomeCategoryTypes;
  description: string;
}[] = [
  {
    type: "Active",
    description:
      "Income you earn directly from your work, like salaries, wages, or freelance jobs.",
  },
  {
    type: "Passive",
    description:
      "Earnings that continue with minimal effort after the initial setup, such as royalties or rental income.",
  },
  {
    type: "Portfolio",
    description:
      "Income generated from investments like stocks, bonds, or mutual funds, including dividends and capital gains.",
  },
  {
    type: "Business",
    description:
      "Profit earned from running your own company, shop, or service, requiring management and effort.",
  },
  {
    type: "Windfall",
    description:
      "Unexpected or one-time income, like gifts, inheritance, or lottery winnings, not usually recurring.",
  },
  {
    type: "Others",
    description:
      "Any income that doesn’t fit the above categories, including side gigs, barter, or miscellaneous sources.",
  },
];

export const incomeColorTypeMap: Record<IncomeCategoryTypes, string> = {
  Active: "#4F46E5",
  Passive: "#10B981",
  Portfolio: "#0EA5E9",
  Business: "#F97316",
  Windfall: "#FBBF24",
  Interest: "#8B5CF6",
  Others: "#6B7280",
};

// 🔹 STATIC DISTRIBUTION
const incomeOverallDistribution = [
  { income_type: "Active", amount: 120000 },
  { income_type: "Business", amount: 45000 },
  { income_type: "Portfolio", amount: 22000 },
  { income_type: "Passive", amount: 15000 },
  { income_type: "Others", amount: 8000 },
] as { income_type: IncomeCategoryTypes; amount: number }[];

const totalAmount = incomeOverallDistribution.reduce((a, b) => a + b.amount, 0);

const IncomeTypes = () => {
  const [hoveredType, setHoveredType] = useState<IncomeCategoryTypes | null>(
    null
  );

  const getPercentage = (item: IncomeCategoryTypes) => {
    const selectedType = incomeOverallDistribution.find(
      ({ income_type }) => income_type === item
    )?.amount;

    if (!selectedType || !totalAmount) return 0;
    return (selectedType / totalAmount) * 100;
  };

  return (
    <div className="flex flex-col gap-[1vw] w-[20vw] h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
      <div className="flex items-center gap-[0.6vw]">
        <BanknoteArrowDownIcon size={15} />
        <p className="text-[0.9vw] font-medium opacity-50">
          Income Types Panel
        </p>
      </div>

      <hr className="text-card border-2" />

      <ul className="flex flex-col gap-[0.8vw]">
        {incomeTypes.map(({ description, type }, key) => (
          <li
            key={key}
            onMouseEnter={() => setHoveredType(type)}
            onMouseLeave={() => setHoveredType(null)}
            className="cursor-pointer relative flex items-center justify-between px-[1vw] py-[0.6vw] rounded-[0.3vw] text-[1vw] bg-card"
          >
            {hoveredType === type && (
              <div className="absolute w-fit top-0 shadow-lg left-full px-[1vw] py-[0.4vw] bg-card rounded-[0.5vw] z-10">
                <p className="text-[0.85vw] font-medium w-[12rem] text-start opacity-80">
                  {description}
                </p>
              </div>
            )}

            <p className="text-[1vw]">{type}</p>

            <div className="w-1/2">
              <p className="text-[0.85vw] font-semibold opacity-75">
                {Number(getPercentage(type).toFixed(0)) <= 0
                  ? "--"
                  : `${getPercentage(type).toFixed(0)}%`}
              </p>

              <div
                style={{
                  backgroundColor: `${incomeColorTypeMap[type]}20`,
                }}
                className="w-full rounded-full"
              >
                <div
                  style={{
                    width: `${getPercentage(type)}%`,
                    backgroundColor: `${incomeColorTypeMap[type]}`,
                  }}
                  className="py-[0.23vw] rounded-full"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeTypes;
