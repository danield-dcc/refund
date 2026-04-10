import { useQuery } from "@tanstack/react-query";
import {
  createSerializer,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";
import { fetcher } from "../../../helpers/api";
import type { RefundsResponse } from "../models/refunds";

const MAX_PER_PAGE = 6;

const toSearchParams = createSerializer({
  refundId: parseAsString,
  q: parseAsString,
  page: parseAsInteger,
  limit: parseAsInteger,
});

export default function useRefunds() {
  const [refundId, setRefundId] = useQueryState("refundId");
  const [q, setQ] = useQueryState("q");
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data, isLoading } = useQuery<RefundsResponse>({
    queryKey: ["refund", refundId, q, page],
    queryFn: () =>
      fetcher(
        `/refunds${toSearchParams({ refundId, q, page, limit: MAX_PER_PAGE })}`,
      ),
  });

  return {
    refunds: data?.refunds.data || [],
    meta: data?.refunds.meta,
    isLoadingRefunds: isLoading,
    page,
    setPage,
    filters: {
      q,
      setQ,
      refundId,
      setRefundId,
    },
  };
}
