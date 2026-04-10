import ReceiptIcon from "../../assets/icons/receipt.svg?react";
import Icon from "./icon";
import Text from "./text";

interface ReceiptLinkProps {
  receiptId: string;
  label?: string;
  getUrl: (receiptId: string) => string;
}

export default function ReceiptLink({
  receiptId,
  label = "Abrir comprovante",
  getUrl,
}: ReceiptLinkProps) {
  function handleOpen() {
    window.open(getUrl(receiptId), "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={handleOpen}
      className="flex items-center justify-center gap-2 text-green-100 hover:text-green-200 hover:border-gray-100 hover:cursor-pointer transition-colors"
    >
      <Icon svg={ReceiptIcon} className="w-4 h-4 fill-green-100" />
      <Text variant="body-md" className="text-green-100">
        {label}
      </Text>
    </button>
  );
}
