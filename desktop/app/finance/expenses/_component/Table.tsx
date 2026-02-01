import {
  AccountIconTypes,
  expenseCategoryIconMap,
  ExpenseCategoryIconTypes,
  ExpenseTypes,
} from "@/lib/types";
import {
  Calendar,
  Coins,
  List,
  LucideIcon,
  ShoppingBasket,
  Vault,
} from "lucide-react";
import { accountIconMapp } from "../../_components/Accounts/Accounts";

const expenseHistoryHeader: { label: string; icon: LucideIcon }[] = [
  { label: "Expense on", icon: ShoppingBasket },
  { label: "Amount", icon: Coins },
  { label: "Category", icon: List },
  { label: "Source Account", icon: Vault },
  { label: "Date", icon: Calendar },
];
const Table = ({ items }: { items: ExpenseTypes[] }) => {
  return (
    <table>
      <thead>
        <tr>
          {expenseHistoryHeader.map(({ icon, label }, key) => {
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
        {items.map(
          ({
            amount,
            date_str,
            account,
            category,
            label,
            id,
            acc_icon,
            category_icon,
          }) => {
            const AccountIcon = accountIconMapp[acc_icon as AccountIconTypes];
            const CategoryIcon =
              expenseCategoryIconMap[category_icon as ExpenseCategoryIconTypes];
            return (
              <tr key={id} className="text-[0.9vw] ">
                <td className="border-t-2 border-b-2 border-card py-[0.5vw] px-[1vw]">
                  {label}
                </td>
                <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                  ₱{amount.toLocaleString()}
                </td>
                <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                  <span className="flex items-center gap-[0.4vw]">
                    <CategoryIcon size={16} />
                    {category}
                  </span>
                </td>
                <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                  <span className="flex items-center gap-[0.4vw]">
                    <AccountIcon size={16} />
                    {account}
                  </span>
                </td>
                <td className="border-t-2  border-b-2 border-card py-[0.5vw] px-[1vw]">
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
