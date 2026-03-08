"use client";
import classNames from "classnames";
import { ChevronDown, Trophy, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className=" p-5 px-18 flex items-center border-b border-white/10  justify-between w-full ">
      <div>
        <ul className="flex gap-12 items-center text-sm font-medium text-white/75">
          <Link
            href={"/trading/profile/equity"}
            className={classNames("flex items-center gap-2 px-2 py-0.5 ", {
              "bg-card rounded-md font-semibold text-white!":
                pathname.includes(`/trading/profile`),
            })}
          >
            <User /> Macren Live{" "}
            {pathname.includes(`/trading/profile`) && (
              <button>
                <ChevronDown />
              </button>
            )}
          </Link>
          <Link
            href={"/trading/system"}
            className={classNames("flex items-center gap-2 px-2 py-0.5 ", {
              "bg-card rounded-md font-semibold text-white!":
                pathname.includes(`/trading/system`),
            })}
          >
            System
          </Link>
          <Link
            href={"/trading/pnl"}
            className={classNames("flex items-center gap-2 px-2 py-0.5 ", {
              "bg-card rounded-md font-semibold text-white!":
                pathname.includes(`/trading/pnl`),
            })}
          >
            PnL
          </Link>
        </ul>
      </div>
      <div className="flex w-1/4 items-center gap-8 justify-end">
        <div className="flex items-center gap-[0.6vw]">
          <div className=" bg-flame/20 w-50 h-2.5 rounded-md ">
            <div
              style={{ width: `${35}%` }}
              className={`bg-flame/70   h-full rounded-md`}
            ></div>
          </div>
          <p className="text-sm font-bold opacity-60">10</p>
        </div>
        <Link
          className={classNames("flex items-center gap-2 px-2 py-2 ", {
            "bg-card rounded-md font-semibold text-white!": pathname.includes(
              `/trading/achievements`
            ),
          })}
          href={"/trading/achievements"}
        >
          <Trophy size={18} />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
