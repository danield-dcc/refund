import { useQueryClient } from "@tanstack/react-query";
import { api } from "../../../helpers/api";
import type { FormDataType } from "../../schema/refund";


export default function useRefund() {
  const queryClient = useQueryClient()

  async function createRefund(payload: FormDataType) {
    console.log(payload)
    try {

      const { data } = await api.post(`/receipts`, {
        receiptFile: payload.receipt[0]
      }, {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      })

      await api.post(`/refunds`, {
        title: payload.name,
        category: payload.category,
        value: payload.value,
        receipt: data.receipt.id
      })

      //refetch
      queryClient.invalidateQueries({ queryKey: ["refund"] })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    createRefund
  }

}