"use client";

import {
  expenseCategoryIconMap,
  ExpenseCategoryIconTypes,
  ExpenseCategoryTypes,
} from "@/lib/types";
import { CheckCircle, Trash, XCircleIcon } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import IconSelection from "./IconSelection";
import ErrorMessage from "@/app/_components/ErrorMessage";
import ConfirmationModal from "@/app/_components/ConfirmationModal";

interface Props {
  setSelectedIcon: React.Dispatch<
    React.SetStateAction<ExpenseCategoryIconTypes | null>
  >;
  currentData?: { icon: string; label: string; alloc_per_month: number };
  expenseCategory: ExpenseCategoryTypes[];
  selectedIcon: ExpenseCategoryIconTypes | null;
  setIsAddNewCategory?: React.Dispatch<React.SetStateAction<boolean>>;
  setItemToEdit?: React.Dispatch<React.SetStateAction<string | null>>;
  id?: string;
}

const NewExpenseCategoryForm = ({
  id,
  selectedIcon,
  currentData,
  setItemToEdit,
  setSelectedIcon,
  setIsAddNewCategory,
  expenseCategory,
}: Props) => {
  const { register, handleSubmit } = useForm<ExpenseCategoryTypes>();

  const [errMsg, setErrMsg] = useState<string | null>(null);

  const existingLabels = useMemo(
    () =>
      expenseCategory.map(({ icon, label }) => ({
        icon,
        label,
      })),
    [expenseCategory]
  );

  const hasScan = useRef(false);

  const CurrentIcon =
    expenseCategoryIconMap[currentData?.icon as ExpenseCategoryIconTypes];

  useEffect(() => {
    if (!hasScan.current) {
      if (currentData?.icon) {
        setSelectedIcon(currentData.icon as ExpenseCategoryIconTypes);
      }

      hasScan.current = true;
    }
  }, []);

  const onSubmit = (data: ExpenseCategoryTypes) => {
    if (!selectedIcon) {
      setErrMsg("Please select an icon");
      return;
    }

    const isDuplicate = existingLabels.some(
      ({ label }) => data.label.toLowerCase() === label.toLowerCase()
    );

    if (isDuplicate && !currentData?.label) {
      setErrMsg("Label already existing");
      return;
    }

    // Demo only – no backend
    console.log("Saved category (demo):", {
      ...data,
      icon: selectedIcon,
    });

    setSelectedIcon(null);
    setErrMsg(null);

    if (setIsAddNewCategory) setIsAddNewCategory(false);
    if (setItemToEdit) setItemToEdit(null);
  };

  const handleDelete = () => {
    alert("This is a demo. Delete is disabled.");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative border-card border-3 p-[0.8vw] rounded-[0.6vw] flex items-center justify-around gap-[0.6vw]"
    >
      <div className="flex flex-col items-start gap-[0.85vw]">
        <div>
          <input
            type="text"
            {...register("label")}
            required
            autoComplete="off"
            defaultValue={currentData?.label}
            className="text-[1.1vw] font-semibold outline-none w-[9vw]"
            placeholder={
              setIsAddNewCategory ? "Category label" : currentData?.label
            }
          />
          <input
            type="number"
            required
            {...register("alloc_per_month")}
            autoComplete="off"
            min={10}
            className="text-[0.8vw] font-normal outline-none w-[9vw]"
            placeholder={
              setIsAddNewCategory
                ? "Budget per month"
                : String(currentData?.alloc_per_month)
            }
          />
        </div>

        <IconSelection
          existingLabels={existingLabels}
          currentData={currentData}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />

        {errMsg && <ErrorMessage errMsg={errMsg} />}
      </div>

      <div className="flex flex-col items-end gap-[0.5vw]">
        <button type="submit" className="cursor-pointer text-green-500/70">
          <CheckCircle size={25} />
        </button>

        <button
          type="button"
          onClick={() => {
            if (setIsAddNewCategory) setIsAddNewCategory(false);
            else if (setItemToEdit) setItemToEdit(null);
          }}
          className="cursor-pointer opacity-40"
        >
          <XCircleIcon size={25} />
        </button>

        {currentData && (
          <ConfirmationModal
            label="Demo mode"
            action={handleDelete}
            sub_label={
              <>
                <CurrentIcon size={14} />
                {currentData.label}
              </>
            }
          >
            <Trash size={18} color="red" />
          </ConfirmationModal>
        )}
      </div>
    </form>
  );
};

export default NewExpenseCategoryForm;
