import { useForm } from "react-hook-form";
import ReceiptIcon from "../assets/icons/receipt.svg?react";
import SearchIcon from "../assets/icons/search.svg?react";
import ButtonIcon from "../components/ui/button-icon";
import Container from "../components/ui/container";
import Divider from "../components/ui/diviser";
import InputText from "../components/ui/input-text";
import Text from "../components/ui/text";
import useRefunds from "../features/page-home/hooks/use-refunds";
import ListOfSolicitations from "../features/page-home/ListOfSolicitations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SearchRefundSchema,
  type FormRefundSchemaType,
} from "../features/schema/refund";
import PaginationButton from "../components/pagination-buttons";
import { _CATEGORY_ICON, _CATEGORY_NAMES } from "../features/tables";

export default function PageHome() {
  const { refunds, meta, isLoadingRefunds, page, setPage, filters } =
    useRefunds();
  const { register, handleSubmit } = useForm<FormRefundSchemaType>({
    resolver: zodResolver(SearchRefundSchema),
  });

  function refundSearch(data: FormRefundSchemaType) {
    filters.setQ(data.name);
    setPage(1);
  }

  return (
    <Container className="bg-gray-500 max-w-270.5 h-146 mx-auto rounded-2xl p-10 flex flex-col">
      <Text variant="title-md" className="text-gray-100">
        Solicitações
      </Text>

      <form
        onSubmit={handleSubmit(refundSearch)}
        className="flex gap-3 items-center mt-6"
      >
        <InputText
          placeholder="Pesquisar pelo nome"
          className="flex-1"
          {...register("name")}
        />
        <ButtonIcon icon={SearchIcon} className="h-12 w-12 mt-1" />
      </form>

      <Divider className="mt-6" />

      <div className="flex flex-col gap-4 mt-6 h-10">
        {!isLoadingRefunds &&
          refunds.map((item) => (
            <ListOfSolicitations
              key={item.id}
              id={item.id}
              icon={
                _CATEGORY_ICON[item.category as keyof typeof _CATEGORY_ICON] ??
                ReceiptIcon
              }
              name={item.title}
              category={
                _CATEGORY_NAMES[
                  item.category as keyof typeof _CATEGORY_NAMES
                ] ?? "Outros"
              }
              price={item.value}
            />
          ))}
      </div>

      <PaginationButton
        isLoadingRefunds={isLoadingRefunds}
        page={page}
        setPage={setPage}
        lastPage={meta?.lastPage}
      />
    </Container>
  );
}
