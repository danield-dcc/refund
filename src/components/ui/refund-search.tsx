import {
  useCallback,
  useState,
  type ChangeEvent,
  type ComponentProps,
} from "react";
import { debounce } from "../../helpers/utils";
import useRefunds from "../../features/page-home/hooks/use-refunds";
import InputText from "./input-text";

interface RefundSearchProps extends Omit<
  ComponentProps<"input">,
  "size" | "disabled"
> {}

export default function RefundSearch({ ...props }: RefundSearchProps) {
  const { setPage } = useRefunds();
  const [inputValue, setInputValue] = useState("");
  const { filters } = useRefunds();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const debouncedSetValue = useCallback(
    debounce((value: string) => {
      filters.setQ(value);
    }, 500),
    [filters.setQ],
  );

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    console.log("Campo de texto: ", value);
    setInputValue(value);
    debouncedSetValue(value);
    setPage(1);
  }

  return (
    <InputText
      placeholder="Pesquisar pelo nome"
      className="flex-1"
      value={inputValue}
      onChange={handleInputChange}
      {...props}
    />
  );
}
