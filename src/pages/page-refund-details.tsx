import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import Button from "../components/ui/button";
import ContentCard from "../components/ui/ContentCard";
import InputText from "../components/ui/input-text";
import ReceiptLink from "../components/ui/receipt-link";
import Select from "../components/ui/select";
import Text from "../components/ui/text";

import {
  type DetailFormDataType,
  detailsSchema,
} from "../features/schema/refund";
import useRefund from "../features/page-home/hooks/use-refund";

const options = [
  { key: "food", value: "Alimentação" },
  { key: "hosting", value: "Hospedagem" },
  { key: "transport", value: "Transporte" },
  { key: "services", value: "Serviços" },
  { key: "other", value: "Outros" },
];

export default function PageRefundDetails() {
  const { id } = useParams<{ id: string }>();

  const { refund, isLoadingRefund, getReceiptDownloadUrl } = useRefund(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DetailFormDataType>({
    resolver: zodResolver(detailsSchema),
    defaultValues: { name: "", category: "", value: "" },
  });

  useEffect(() => {
    if (refund) {
      console.log("useEffect", refund);

      reset({
        name: refund?.title,
        category: refund?.category,
        value: refund?.value?.toString(),
      });
    }
  }, [refund, reset]);

  function onSubmit(data: DetailFormDataType) {
    console.log(data);
  }

  return (
    <div className="flex justify-center">
      <ContentCard>
        <div className="flex flex-col gap-1">
          <Text variant="title-lg" as="h1" className="text-gray-100">
            Solicitação de reembolso
          </Text>
          <Text variant="body-md" className="text-gray-200">
            Detalhes da solicitação
          </Text>
        </div>

        {isLoadingRefund ? (
          <Text variant="body-md" className="text-gray-200 mt-6">
            Carregando...
          </Text>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-6"
          >
            <InputText
              id="name"
              label="NOME DA SOLICITAÇÃO"
              placeholder="Nome da solicitação"
              error={errors.name?.message}
              {...register("name")}
            />

            <div className="flex gap-3 items-end">
              <Select
                id="category"
                label="CATEGORIA"
                className="flex-1"
                options={options}
                placeholder="Selecione"
                error={errors.category?.message}
                {...register("category")}
              />
              <InputText
                id="value"
                label="VALOR"
                placeholder="0,00"
                className="w-32"
                error={errors.value?.message}
                {...register("value")}
              />
            </div>

            {refund?.receipt && (
              <ReceiptLink
                receiptId={refund.receipt.id}
                getUrl={getReceiptDownloadUrl}
              />
            )}

            <Button type="submit" className="mt-2">
              Excluir Solicitação
            </Button>
          </form>
        )}
      </ContentCard>
    </div>
  );
}
