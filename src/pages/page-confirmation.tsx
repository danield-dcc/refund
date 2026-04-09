import { useNavigate } from "react-router";
import SuccessIcon from "../assets/icons/success.svg?react";
import Button from "../components/ui/button";
import ContentCard from "../components/ui/ContentCard";
import Icon from "../components/ui/icon";
import Text from "../components/ui/text";

export default function PageConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <ContentCard>
        <div className="flex flex-col items-center gap-6">
          <Text
            variant="title-lg"
            as="h1"
            className="text-2xl text-green-100 text-center"
          >
            Solicitação enviada!
          </Text>
          <Icon svg={SuccessIcon} className="w-27.5 h-27.5" />
          <Text variant="body-md" as="p" className="text-gray-200 text-center">
            Agora é apenas aguardar! Sua solicitação será analisada e, em breve,
            o setor financeiro irá entrar em contato com você.
          </Text>
        </div>
        <Button className="w-full" onClick={() => navigate("/new-refund")}>
          Nova solicitação
        </Button>
      </ContentCard>
    </div>
  );
}
