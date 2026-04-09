import { useQuery } from "@tanstack/react-query"
import { fetcher } from "../../../helpers/api"
import type { RefundsResponse } from "../models/refunds"



export default function useRefunds() {
  const { data, isLoading } = useQuery<RefundsResponse>({
    queryKey: ["refund"],
    queryFn: () => fetcher(`/refunds`)
  })


  return {
    refunds: data?.refunds.data || [],
    isLoadingRefunds: isLoading,
  }
}