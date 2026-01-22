"use client";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/lib/logout";
import { useSidePanel } from "@/store/sidePanel/useSidePanel";

import classNames from "classnames";
import {
  ChartCandlestick,
  Home,
  Landmark,
  LogOut,
  LucideIcon,
  PanelLeft,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const menuLinks: { icon: LucideIcon; label: string; path: string }[] = [
  {
    icon: Home,
    label: "Home",
    path: "/",
  },
  {
    icon: Landmark,
    label: "Finance",
    path: "/finance",
  },
  {
    icon: ChartCandlestick,
    label: "Trading",
    path: "/trading",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
  },
];

const SidePanel = () => {
  const { user, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const { handleClosePanel, handleOpenPanel, isSidePanel } = useSidePanel();
  const avatarUrl = user?.user_metadata?.avatar_url;
  if (!isAuthenticated) return;
  return (
    <aside
      onMouseEnter={handleOpenPanel}
      onMouseLeave={handleClosePanel}
      className={classNames(
        "border-r-2 transition-all fixed top-0 bg-[#121212]  z-100 bottom-0 duration-300 border-white/10 h-dvh ",
        {
          "left-0": isSidePanel,
          "-left-1/2": !isSidePanel,
        }
      )}
    >
      <button
        onPointerEnter={handleOpenPanel}
        className={classNames(
          "fixed top-0 left-0 px-3  py-3 h-full flex items-start"
        )}
      >
        <PanelLeft
          size={16}
          className={classNames("opacity-55 duration-300 transition-all", {
            hidden: isSidePanel,
          })}
        />
      </button>

      <div className="py-2 border-b-2 border-white/10 ">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt="avatar"
            width={200}
            height={200}
            className="rounded-full w-12 p-0.5 border-2 mx-auto border-[#262626] aspect-square"
          />
        )}
      </div>
      <ul className="flex flex-col gap-4 h-[90%]   items-center pt-4 px-4 ">
        {menuLinks.map(({ icon, label, path }, idx) => {
          const IconComponent = icon;
          return (
            <li
              className={classNames("flex flex-col items-center", {
                "opacity-60 hover:opacity-100": path !== pathname,
              })}
              key={`${label.toLowerCase()}-${idx}`}
            >
              <Link
                className={classNames(
                  " w-fit p-2 rounded-lg border-2  hover:bg-[#262626] transition duration-200 border-[#262626] cursor-pointer",
                  {
                    "bg-[#262626]": path === pathname,
                  }
                )}
                href={path}
              >
                <IconComponent size={20} />
              </Link>
              <p
                className={classNames("text-[0.65rem]", {
                  "text-shadow-white font-semibold": path === pathname,
                })}
              >
                {label}
              </p>
            </li>
          );
        })}
        <li className="flex flex-col items-center mt-auto">
          <button
            onClick={() => logout()}
            className="bg-[#202020] w-fit  p-2 hover:bg-[#2c2c2c] transition duration-200  rounded-lg  cursor-pointer"
          >
            {" "}
            <LogOut size={20} />
          </button>
          <p className="text-[0.65rem]">Logout</p>
        </li>
      </ul>
    </aside>
  );
};

export default SidePanel;
