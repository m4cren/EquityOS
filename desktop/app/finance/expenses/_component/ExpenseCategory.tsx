"use client";

import { expenseCategoryIconMap, ExpenseCategoryIconTypes } from "@/lib/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import NewExpenseCategoryForm from "./NewExpenseCategoryForm";
import Card from "./Card";

// 🔹 STATIC DUMMY CATEGORIES
const dummyCategories = [
  {
    id: "1",
    label: "Food",
    icon: "Food",
    alloc_per_month: 5000,
  },
  {
    id: "2",
    label: "Transport",
    icon: "Transportation",
    alloc_per_month: 3000,
  },
  {
    id: "3",
    label: "Bills",
    icon: "Subscription",
    alloc_per_month: 6000,
  },
  {
    id: "4",
    label: "Entertainment",
    icon: "Hobbies",
    alloc_per_month: 2500,
  },
] satisfies {
  id: string;
  label: string;
  icon: ExpenseCategoryIconTypes;
  alloc_per_month: number;
}[];

const ExpenseCategory = () => {
  const [expenseCategory, setExpenseCategory] = useState(dummyCategories);

  const [isAddNewCategory, setIsAddNewCategory] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = useState<string | null>(null);

  const [selectedIcon, setSelectedIcon] =
    useState<ExpenseCategoryIconTypes | null>(null);

  return (
    <div className="flex flex-col gap-[1vw] w-[20vw] h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
      <p className="text-[0.9vw] font-medium opacity-50">Expense Category</p>
      <hr className="text-card border-2" />

      <ul className="flex flex-col gap-[0.8vw]">
        {expenseCategory.map(({ alloc_per_month, icon, label, id }) => {
          const IconComponent =
            expenseCategoryIconMap[icon as ExpenseCategoryIconTypes];

          if (id && itemToEdit !== id) {
            return (
              <Card
                key={id}
                id={id}
                setItemToEdit={setItemToEdit}
                alloc_per_month={Number(alloc_per_month)}
                label={label}
              >
                <IconComponent />
              </Card>
            );
          }

          return (
            <NewExpenseCategoryForm
              key={id}
              expenseCategory={expenseCategory}
              selectedIcon={selectedIcon}
              setItemToEdit={setItemToEdit}
              currentData={{
                icon,
                label,
                alloc_per_month,
              }}
              setSelectedIcon={setSelectedIcon}
              id={id}
            />
          );
        })}

        {isAddNewCategory ? (
          <NewExpenseCategoryForm
            expenseCategory={expenseCategory}
            selectedIcon={selectedIcon}
            setIsAddNewCategory={setIsAddNewCategory}
            setSelectedIcon={setSelectedIcon}
          />
        ) : (
          <li
            onClick={() => setIsAddNewCategory(true)}
            className="flex hover:bg-card transition duration-100 cursor-pointer flex-col gap-[0.4vw] bg-transparent border-3 border-card py-[1.5vw] rounded-[0.4vw] p-[1vw]"
          >
            <div className="flex items-center justify-center gap-[0.1vw]">
              <Plus size={30} opacity={0.3} />
              <h3 className="font-semibold opacity-40 px-[0.5vw] py-[0.1vw] text-[1vw] rounded-[0.4vw]">
                Add new category
              </h3>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ExpenseCategory;
