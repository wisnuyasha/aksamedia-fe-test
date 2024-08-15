import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import clsxm from "../../../utils/clsxm";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function TodosTablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", currentPage.toString());

    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState({}, "", newUrl);

    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage - 1 > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage + 1 <= totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex w-full justify-end gap-x-1.5 px-6 mb-6">
      <div
        onClick={handlePrevious}
        className={clsxm(
          "flex gap-x-3 px-4 py-1.5 duration-300 items-center cursor-pointer rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700",
          currentPage === 1 && "cursor-not-allowed"
        )}
      >
        <GrPrevious className="size-3 text-zinc-900 dark:text-zinc-100" />
        <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
          Previous
        </span>
      </div>
      {Array.from({ length: totalPages }, (_, idx) => (
        <div
          key={idx}
          onClick={() => onPageChange(idx + 1)}
          className={clsxm(
            "py-1.5 px-3.5 cursor-pointer duration-300 h-fit rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700",
            currentPage === idx + 1 &&
              "shadow-sm ring-[1px] ring-zinc-300 dark:ring-zinc-700 ring-inset"
          )}
        >
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {idx + 1}
          </span>
        </div>
      ))}

      <div
        onClick={handleNext}
        className={clsxm(
          "flex gap-x-3 px-4 py-1.5 duration-300 items-center cursor-pointer rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700",
          currentPage === totalPages && "cursor-not-allowed"
        )}
      >
        <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
          Next
        </span>
        <GrNext className="size-3 text-zinc-900 dark:text-zinc-100" />
      </div>
    </div>
  );
}
