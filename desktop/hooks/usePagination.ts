"use client";
import { sort } from "fast-sort";
import { useMemo } from "react";

const PAGE_SIZE = 8;
type PaginatedHook = <T extends { created_at?: Date }>(
  items: T[],
  currentPage: number
) => T[];

export const usePagination: PaginatedHook = (items, currentPage) => {
  return useMemo(() => {
    const startIndex = currentPage * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    const sortedByDate = sort(items)
      .desc((item) => item.created_at)
      .slice(startIndex, endIndex);

    return sortedByDate;
  }, [items, currentPage]);
};
