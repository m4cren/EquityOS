"use client";

import { IconType } from "react-icons";

interface Props {
  label: string;
  authFunction: () => void;
  icon: IconType;
}

export default function AuthButton({ authFunction, icon, label }: Props) {
  const IconComponent = icon;
  return (
    <button
      onClick={authFunction}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/20 bg-[#2c2c2c] cursor-pointer px-4 py-3 text-sm font-medium text-[#d4d4d4] shadow-sm transition hover:bg-[#262626]"
    >
      <IconComponent />
      Continue with {label}
    </button>
  );
}
