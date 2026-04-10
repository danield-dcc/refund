import type { Options } from "nuqs";
import ChevronLeft from "../assets/icons/chevron-left.svg?react";
import ChevronRight from "../assets/icons/chevron-right.svg?react";
import ButtonIcon from "./ui/button-icon";
import Text from "./ui/text";

interface PaginationButtonProps {
  isLoadingRefunds: boolean;
  page: number;
  setPage: (
    value: number | ((old: number) => number),
    options?: Options,
  ) => Promise<URLSearchParams>;
  lastPage: number;
}

export default function PaginationButton({
  isLoadingRefunds,
  page,
  setPage,
  lastPage,
}: PaginationButtonProps) {
  return (
    <div className="flex items-center justify-center gap-3 mt-auto">
      <ButtonIcon
        className="fill-gray-500 h-8 w-8 rounded-lg px-2.5"
        icon={ChevronLeft}
        iconClassName={"h-[16.5px] w-2.25"}
        disabled={isLoadingRefunds || page === 1}
        onClick={() => setPage(page - 1)}
      />
      <Text variant="body-md" className="text-gray-200">
        {page}/{lastPage ?? 1}
      </Text>
      <ButtonIcon
        className="fill-gray-500 h-8 w-8 rounded-lg p-2.5"
        icon={ChevronRight}
        iconClassName={"h-[16.5px] w-2.25"}
        disabled={isLoadingRefunds || page === lastPage}
        onClick={() => setPage(page + 1)}
      />
    </div>
  );
}
