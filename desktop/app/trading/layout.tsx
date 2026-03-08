import { ChevronDown, Trophy, User } from "lucide-react";
import type { Metadata } from "next";
import NavBar from "./_components/NavBar/NavBar";

export const metadata: Metadata = {
  title: "Trading",
  description: "Systems over goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      {" "}
      <NavBar />
      {children}
    </div>
  );
}
