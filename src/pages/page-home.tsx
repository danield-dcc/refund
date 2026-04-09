import BedIcon from "../assets/icons/bed.svg?react";
import ChevronLeft from "../assets/icons/chevron-left.svg?react";
import ChevronRight from "../assets/icons/chevron-right.svg?react";
import CutleryIcon from "../assets/icons/cutlery.svg?react";
import CarIcon from "../assets/icons/police_car.svg?react";
import ReceiptIcon from "../assets/icons/receipt.svg?react";
import SearchIcon from "../assets/icons/search.svg?react";
import WrenchIcon from "../assets/icons/wrench.svg?react";
import ButtonIcon from "../components/ui/button-icon";
import Container from "../components/ui/container";
import Divider from "../components/ui/diviser";
import InputText from "../components/ui/input-text";
import Text from "../components/ui/text";
import useRefunds from "../features/page-home/hooks/use-refunds";
import ListOfSolicitations from "../features/page-home/ListOfSolicitations";

const _CATEGORY_ICON = {
  food: CutleryIcon,
  hosting: BedIcon,
  transport: CarIcon,
  services: WrenchIcon,
  other: ReceiptIcon,
} as const;

const _CATEGORY_NAMES = {
  food: "Alimentação",
  hosting: "Hospedagem",
  transport: "Transporte",
  services: "Serviços",
  other: "Outros",
} as const;

export default function PageHome() {
  const { refunds, isLoadingRefunds } = useRefunds();

  return (
    <Container className="bg-gray-500 max-w-270.5 h-146 mx-auto rounded-2xl p-10 flex flex-col">
      <Text variant="title-md" className="text-gray-100">
        Solicitações
      </Text>
      <div className="flex gap-3 items-center mt-6">
        <InputText placeholder="Pesquisar pelo nome" className="flex-1 " />
        <ButtonIcon icon={SearchIcon} className="h-12 w-12 mt-1" />
      </div>
      <Divider className="mt-6" />

      {/* items da home */}
      <div className="flex flex-col gap-4 mt-6">
        {!isLoadingRefunds &&
          refunds.map((item) => (
            <ListOfSolicitations
              key={item.id}
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

      <div className="flex items-center justify-center gap-3 mt-auto">
        <ButtonIcon
          className="fill-gray-500 h-8 w-8 rounded-lg p-2.5"
          icon={ChevronLeft}
          iconClassName={"h-[16.5px] w-2.25"}
        />
        <Text variant="body-md" className="text-gray-200">
          1/3
        </Text>
        <ButtonIcon
          className="fill-gray-500 h-8 w-8 rounded-lg"
          icon={ChevronRight}
          iconClassName={"h-[16.5px] w-2.25"}
        />
      </div>
    </Container>
  );
}
