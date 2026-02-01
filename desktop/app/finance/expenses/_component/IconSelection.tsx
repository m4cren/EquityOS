import DropDownSelection from "@/app/_components/DropDownSelection";
import { expenseCategoryIconMap, ExpenseCategoryIconTypes } from "@/lib/types";
import React, { ReactNode } from "react";
const categoryIconOptions: ExpenseCategoryIconTypes[] = [
  "Childcare",
  "Clothing",
  "Donations",
  "Education",
  "Emergency",
  "Entertainment",
  "Food",
  "Fun",
  "Groceries",
  "Gym",
  "Hobbies",
  "Insurance",
  "Internet",
  "Loans",
  "Medical",
  "Miscellaneous",
  "Pets",
  "Rent",
  "Subscription",
  "Transportation",
  "Travel",
  "Utilities",
];

interface Props {
  setSelectedIcon: React.Dispatch<
    React.SetStateAction<ExpenseCategoryIconTypes | null>
  >;
  selectedIcon: ExpenseCategoryIconTypes | null;
  existingLabels: { icon: string; label: string }[];
  currentData?: { icon: string; label: string };
}
const IconSelection = ({
  selectedIcon,
  currentData,
  setSelectedIcon,

  existingLabels,
}: Props) => {
  const uniqueIcons = categoryIconOptions.filter(
    (icons) => !existingLabels.some(({ icon }) => icon === icons)
  );

  if (currentData?.icon) {
    uniqueIcons.push(currentData.icon as ExpenseCategoryIconTypes);
  }
  const IconComponent =
    expenseCategoryIconMap[selectedIcon! as ExpenseCategoryIconTypes];
  return (
    <DropDownSelection<ReactNode | null>
      selectionLabel="Select icon"
      type="dropdown"
      icon={selectedIcon ? <IconComponent size={18} /> : null}
    >
      <ul className="grid grid-cols-3  gap-[0.1vw]">
        {uniqueIcons.map((icon, id) => {
          const IconExpense =
            expenseCategoryIconMap[icon as ExpenseCategoryIconTypes];
          return (
            <li
              key={id}
              onClick={() => {
                setSelectedIcon(icon);
              }}
              className="flex opacity-80 hover:opacity-100 items-center justify-center gap-[0.3vw] hover:bg-[#d4d4d420] py-[0.4vw] rounded-[0.4vw] transition duration-200"
            >
              <IconExpense size={20} />
            </li>
          );
        })}
      </ul>
    </DropDownSelection>
  );
};

export default IconSelection;
