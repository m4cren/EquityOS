import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";
import SidePanel from "./_components/SidePanel/SidePanel";
import Security from "./Security";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EquityOS",
    template: "%s | EquityOS",
  },

  description: "Systems over goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <ReduxProvider>
          <Security>
            <SidePanel /> {children}
          </Security>
        </ReduxProvider>
      </body>
    </html>
  );
}
