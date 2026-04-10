import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api, fetcher } from "../../../helpers/api";
import type { FormDataType } from "../../schema/refund";
import type { RefundResponse } from "../models/refunds";

export default function useRefund(id?: string | undefined) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<RefundResponse>({
    queryKey: ["refund", id],
    queryFn: () => fetcher(`/refunds/${id}`),
    enabled: !!id,
  });

  async function createRefund(payload: FormDataType) {
    console.log(payload);
    try {
      const { data } = await api.post(
        `/receipts`,
        {
          receiptFile: payload.receipt[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      await api.post(`/refunds`, {
        title: payload.name,
        category: payload.category,
        value: payload.value,
        receipt: data.receipt.id,
      });

      //refetch
      queryClient.invalidateQueries({ queryKey: ["refund"] });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  function getReceiptDownloadUrl(receiptId: string): string {
    return new URL(
      `/receipts/download/${receiptId}`,
      import.meta.env.VITE_API_URL,
    ).toString();
  }

  return {
    createRefund,
    getReceiptDownloadUrl,
    refund: data?.refund,
    isLoadingRefund: isLoading,
  };
}
