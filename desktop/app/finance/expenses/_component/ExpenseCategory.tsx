"use client";

import {
  expenseCategoryIconMap,
  ExpenseCategoryIconTypes,
  ExpenseCategoryTypes,
} from "@/lib/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import NewExpenseCategoryForm from "./NewExpenseCategoryForm";
import Card from "./Card";
import { useExpenseCategory } from "@/store/ExpenseCategorySlice/useExpenseCategory";
import SkeletonCard from "../../_components/Accounts/SkeletonCard";
import { useExpense } from "@/store/RecordExpense/useExpense";

const ExpenseCategory = () => {
  const {
    expense_category,
    dispatch,
    addExpenseCategory,
    editExpenseCategory,
    deleteExpenseCategory,
    is_pending,
  } = useExpenseCategory();

  const { expense } = useExpense();

  console.log(expense);

  const [isAddNewCategory, setIsAddNewCategory] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = useState<string | null>(null);

  const [selectedIcon, setSelectedIcon] =
    useState<ExpenseCategoryIconTypes | null>(null);

  const handleAddExpenseCategory = (
    label: string,
    icon: ExpenseCategoryIconTypes,
    alloc_per_month: number
  ) => {
    dispatch(addExpenseCategory({ label, icon, alloc_per_month }));
  };

  const handleEditExpenseCategory = (
    id: string,
    newLabel: string,
    newIcon: ExpenseCategoryIconTypes,
    newAlloc_per_month: number
  ) => {
    dispatch(
      editExpenseCategory({
        id,
        newLabel,
        newIcon,
        newAlloc_per_month,
      })
    );
  };

  const handleDeleteExpenseCategory = (id: string, label: string) => {
    dispatch(deleteExpenseCategory({ id, label }));
  };
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  return (
    <div className="flex flex-col gap-[1vw] w-[20vw] h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
      <p className="text-[0.9vw] font-medium opacity-50">Expense Category</p>
      <hr className="text-card border-2" />

      <ul className="flex flex-col gap-[0.8vw]">
        {!is_pending ? (
          expense_category.map(({ alloc_per_month, icon, label, id }) => {
            const IconComponent =
              expenseCategoryIconMap[icon as ExpenseCategoryIconTypes];

            const monthlyExpense = expense
              ?.filter((item) => {
                const expenseDate = new Date(item.date_str);

                return (
                  item.category === label &&
                  expenseDate.getUTCFullYear() === currentYear &&
                  expenseDate.getUTCMonth() === currentMonth
                );
              })
              .reduce((total, item) => total + Number(item.amount), 0);

            const annualExpense = expense
              ?.filter((item) => {
                const expenseDate = new Date(item.date_str);

                return (
                  item.category === label &&
                  expenseDate.getUTCFullYear() === currentYear
                );
              })
              .reduce((total, item) => total + Number(item.amount), 0);

            if (id && itemToEdit !== id) {
              return (
                <Card
                  totalExpenseThisMonth={monthlyExpense}
                  totalExpenseThisYear={annualExpense}
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
                handleDeleteExpenseCategory={handleDeleteExpenseCategory}
                handleEditExpenseCategory={handleEditExpenseCategory}
                action="EDIT"
                handleAddExpenseCategory={handleAddExpenseCategory}
                key={id}
                expenseCategory={expense_category}
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
          })
        ) : (
          <SkeletonCard />
        )}

        {isAddNewCategory ? (
          <NewExpenseCategoryForm
            handleDeleteExpenseCategory={handleDeleteExpenseCategory}
            handleEditExpenseCategory={handleEditExpenseCategory}
            action="ADD"
            handleAddExpenseCategory={handleAddExpenseCategory}
            expenseCategory={expense_category}
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
