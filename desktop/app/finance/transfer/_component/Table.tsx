import { Calendar, Coins, LucideIcon, Mail, Send } from "lucide-react";
import { AccountIconTypes, TransferTypes } from "@/lib/types";
import { accountIconMapp } from "../../_components/Accounts/Accounts";

const transferHistoryHeader: { label: string; icon: LucideIcon }[] = [
  { label: "From account", icon: Send },
  { label: "Amount", icon: Coins },
  { label: "To Account", icon: Mail },
  { label: "Date", icon: Calendar },
];

const isBalanceShown = true; // static

const Table = ({ sortedByDate }: { sortedByDate: TransferTypes[] }) => {
  return (
    <table>
      <thead>
        <tr>
          {transferHistoryHeader.map(({ icon, label }, key) => {
            const IconComponent = icon;
            return (
              <th key={key} className="py-[0.6vw] px-[0.5vw]">
                <span className="flex items-center gap-[0.3vw] text-[0.9vw] font-medium opacity-80">
                  <IconComponent size={15} />
                  {label}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {sortedByDate.map(
          ({
            amount,
            date_str,
            from_acc,
            to_acc,
            id,
            from_acc_icon,
            to_acc_icon,
          }) => {
            const FromAccountIcon =
              accountIconMapp[from_acc_icon as AccountIconTypes];
            const ToAccountIcon =
              accountIconMapp[to_acc_icon as AccountIconTypes];

            return (
              <tr key={id} className="text-[0.9vw]">
                <td className="border-t-2 border-b-2 border-card py-[0.5vw] px-[1vw]">
                  <span className="flex items-center gap-[0.4vw]">
                    <FromAccountIcon size={16} />
                    {from_acc}
                  </span>
                </td>

                <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                  ₱ {isBalanceShown ? amount.toLocaleString() : "••••"}
                </td>

                <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                  <span className="flex items-center gap-[0.4vw]">
                    <ToAccountIcon size={16} />
                    {to_acc}
                  </span>
                </td>

                <td className="border-t-2 border-b-2 border-card py-[0.5vw] px-[1vw]">
                  {date_str}
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};

export default Table;
