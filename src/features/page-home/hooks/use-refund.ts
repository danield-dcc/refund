import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, fetcher } from "../../../helpers/api";
import type { FormDataType } from "../../schema/refund";
import type { RefundResponse, RefundsResponse, } from "../models/refunds";
import { toast } from "sonner";

export default function useRefund(id?: string | undefined) {
  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery<RefundResponse>({
    queryKey: ["refund", id],
    queryFn: () => fetcher(`/refunds/${id}`),
    enabled: !!id,
  });

  async function createRefund(payload: FormDataType) {
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

      toast.success("Refund criado com sucesso!")
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar Refund.")
      throw error;
    }
  }

  function getReceiptDownloadUrl(receiptId: string): string {
    return new URL(
      `/receipts/download/${receiptId}`,
      import.meta.env.VITE_API_URL,
    ).toString();
  }

  const { mutateAsync: deleteUserRefund, isPending: isDeletingRefund } =
    useMutation({
      mutationFn: async () => {
        await api.delete(`/refunds/${id}`);
      },
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: ["refund", id], exact: true });
        queryClient.setQueriesData<
          RefundsResponse | RefundResponse | undefined
        >({ queryKey: ["refund"] }, (currentData) => {
          if (!currentData || !("refunds" in currentData)) {
            return currentData;
          }

          return {
            ...currentData,
            refunds: {
              ...currentData.refunds,
              data: currentData.refunds.data.filter(
                (refundItem) => refundItem.id !== id,
              ),
            },
          };
        });
        queryClient.invalidateQueries({ queryKey: ["refund"] });
        toast.success("Refund excluído com sucesso!")
      },
      onError: () => {
        toast.error("Não foi possivel excluir a solicitação. Tente novamente.")
      }
    });

  return {
    createRefund,
    deleteUserRefund,
    getReceiptDownloadUrl,
    hasRefundError: isError,
    refund: data?.refund,
    isDeletingRefund,
    isLoadingRefund: isLoading,
  };
}