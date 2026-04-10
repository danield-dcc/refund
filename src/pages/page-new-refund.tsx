import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Button from "../components/ui/button";
import ContentCard from "../components/ui/ContentCard";
import InputText from "../components/ui/input-text";
import Select from "../components/ui/select";
import Text from "../components/ui/text";
import UploadInput from "../components/ui/upload-input";
import { schema, type FormDataType } from "../features/schema/refund";
import useRefund from "../features/page-home/hooks/use-refund";

const options = [
  { key: "food", value: "Alimentação" },
  { key: "hosting", value: "Hospedagem" },
  { key: "transport", value: "Transporte" },
  { key: "services", value: "Serviços" },
  { key: "other", value: "Outros" },
];

export default function PageNewRefund() {
  const navigate = useNavigate();

  const { createRefund } = useRefund();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", category: "", value: "" },
  });

  async function onSubmit(payload: FormDataType) {
    await createRefund(payload);
    navigate("/confirmation");
  }

  return (
    <div className="flex justify-center">
      <ContentCard>
        <div className="flex flex-col gap-1">
          <Text variant="title-lg" as="h1" className="text-gray-100">
            Nova solicitação de reembolso
          </Text>
          <Text variant="body-md" as="p" className="text-gray-200">
            Dados da despesa para solicitar reembolso.
          </Text>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <InputText
            id="name"
            label="NOME DA SOLICITAÇÃO"
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

          <Controller
            control={control}
            name="receipt"
            render={({ field: { onChange, onBlur, name } }) => (
              <UploadInput
                id="receipt"
                name={name}
                label="COMPROVANTE"
                onChange={(e) => onChange(e.target.files)}
                onBlur={onBlur}
                error={errors.receipt?.message}
                allowedTypes={["pdf", ".png", ".jpg", ".jpeg"]}
              />
            )}
          />

          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </ContentCard>
    </div>
  );
}
