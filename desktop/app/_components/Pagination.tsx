import classNames from "classnames";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  items: number;

  currentPage: number;
  name: string;
}
const PAGE_SIZE = 5;
const Pagination = ({ currentPage, items, name }: Props) => {
  const pages = Math.ceil(items / PAGE_SIZE);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(`${name}`, page.toString());
    router.push("?" + params.toString(), { scroll: false });
  };

  if (PAGE_SIZE < items) {
    return (
      <div className="flex items-center justify-center gap-[1vw]">
        <button
          disabled={currentPage === 0}
          className="cursor-pointer opacity-80 disabled:opacity-25"
          onClick={() => handleChangePage(currentPage - 1)}
        >
          <ChevronLeft size={25} />
        </button>

        <div className="flex items-center gap-[0.4vw]">
          {Array.from({ length: pages }).map((_, key) => (
            <p
              key={key}
              className={classNames(
                "w-[0.6vw] h-[0.6vw] bg-card rounded-full",
                {
                  "bg-[#404040]!": currentPage === key,
                }
              )}
            />
          ))}
        </div>
        <button
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === pages - 1}
          className="cursor-pointer opacity-80 disabled:opacity-25"
        >
          <ChevronRight size={25} />
        </button>
      </div>
    );
  }
};

export default Pagination;
