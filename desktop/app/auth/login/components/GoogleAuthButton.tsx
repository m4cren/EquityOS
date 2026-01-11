"use client";

import Image from "next/image";
import { signInWithGoogle } from "@/lib/auth-actions";

export default function GoogleAuthButton() {
  return (
    <button
      onClick={() => signInWithGoogle()}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/20 bg-[#2c2c2c] cursor-pointer px-4 py-3 text-sm font-medium text-[#d4d4d4] shadow-sm transition hover:bg-[#262626]"
    >
      <img src="/images/google_logo.png" alt="" width={18} height={18} />
      Continue with Google
    </button>
  );
}
