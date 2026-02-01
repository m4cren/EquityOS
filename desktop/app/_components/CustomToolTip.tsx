import { TooltipContentProps } from "recharts";

export const CustomTooltip = ({
  active,
  label,
  payload,
}: TooltipContentProps<number, string>) => {
  if (!active || !payload?.length) return null;

  const { income_type, amount } = (payload[0].payload ?? {}) as {
    income_type?: string;
    amount?: number;
  };

  const value = payload[0].value ?? 0;

  return (
    <div className="flex flex-col gap-[0.2vw] bg-card p-[0.5vw] rounded-[0.5vw]">
      <p className="text-[0.75vw] text-[#d4d4d440]">
        {income_type ? `${income_type} income` : label}
      </p>
      <p className="text-[0.9vw] text-[#d4d4d4] font-normal">
        ₱{(amount ?? value).toLocaleString()}
      </p>
    </div>
  );
};
