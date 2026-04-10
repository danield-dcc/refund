import SearchIcon from "../assets/icons/search.svg?react";
import Button from "../components/ui/button";
import ButtonIcon from "../components/ui/button-icon";
import InputText from "../components/ui/input-text";
import NavLink from "../components/ui/nav-link";
import Select from "../components/ui/select";

export default function PageComponents() {
  return (
    <div className="grid gap-7 p-6">
      <div className="flex gap-3">
        <Button>Nova Solicitação</Button>
        <Button disabled>Button</Button>
      </div>

      <div className="flex gap-3">
        <ButtonIcon icon={SearchIcon} />
        <ButtonIcon icon={SearchIcon} disabled />
      </div>

      <div>
        <InputText placeholder="Placeholder" label="Titulo" />
      </div>

      <div>
        <Select
          label="Texto"
          options={[
            { key: "food", value: "Alimentação" },
            { key: "hosting", value: "Hospedagem" },
            { key: "transport", value: "Transporte" },
            { key: "services", value: "Serviços" },
            { key: "other", value: "Outros" },
          ]}
        />
      </div>

      <div>
        <NavLink to={"/"}>Link</NavLink>
      </div>
    </div>
  );
}
