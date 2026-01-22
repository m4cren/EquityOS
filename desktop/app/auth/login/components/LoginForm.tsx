"use client";
import { signInWithFacebook, signInWithGoogle } from "@/lib/auth-actions";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import AuthButton from "./AuthButton";

const authProviders = [
  {
    icon: FaGoogle,
    authFunction: signInWithGoogle,
    label: "Google",
  },
  {
    icon: FaFacebook,
    authFunction: signInWithFacebook,
    label: "Facebook",
  },
];
export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-sm rounded-2xl bg-[#262626] p-8 shadow-lg">
        {/* Logo / Brand */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-[#d4d4d4]">
            EquityOS
          </h1>
          <p className="mt-2 text-sm text-[#c3c3c3]">
            Systems over goals. What you track expands.
          </p>
        </div>

        {/* Auth */}
        <div className="space-y-4">
          {authProviders.map(({ authFunction, icon, label }) => (
            <AuthButton
              key={label}
              authFunction={authFunction}
              icon={icon}
              label={label}
            />
          ))}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#c3c3c3]">
          By continuing, you agree to EquityOS terms and privacy policy.
        </p>
      </div>
    </main>
  );
}
