import * as AlertDialog from "@radix-ui/react-alert-dialog";
import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import Button from "./ui/button";
import Text from "./ui/text";

export const alertDialogOverlayVariants = tv({
  base: "fixed inset-0 z-50 bg-gray-100/70",
});

export const alertDialogContentVariants = tv({
  base: `fixed left-1/2 top-1/2 z-50 flex w-[calc(100%-2rem)]
  max-w-[30.625rem] -translate-x-1/2 -translate-y-1/2 flex-col
  gap-6 rounded-[20px] bg-white px-10 py-11 shadow-lg outline-none`,
});

export const alertDialogActionsVariants = tv({
  base: "flex items-center justify-end gap-8",
});

export const alertDialogCancelVariants = tv({
  base: `cursor-pointer text-sm leading-5 font-bold
  text-green-100 transition hover:text-green-200
  disabled:pointer-events-none disabled:opacity-50`,
});

interface AlertDialogDeleteRefundProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  isPending?: boolean;
  errorMessage?: string | null;
}

export default function AlertDialogDeleteRefund({
  children,
  open,
  onOpenChange,
  onConfirm,
  isPending = false,
  errorMessage,
}: AlertDialogDeleteRefundProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className={alertDialogOverlayVariants()} />

        <AlertDialog.Content className={alertDialogContentVariants()}>
          <div className="flex flex-col gap-3">
            <AlertDialog.Title asChild>
              <Text variant="title-lg" as="h2" className="text-gray-100">
                Excluir solicitação
              </Text>
            </AlertDialog.Title>

            <AlertDialog.Description asChild>
              <Text variant="body-md" as="p" className="max-w-90 text-gray-200">
                Tem certeza que deseja excluir essa solicitação? Essa ação é
                irreversível.
              </Text>
            </AlertDialog.Description>

            {errorMessage && (
              <Text variant="body-sm" as="p" className="text-green-200">
                {errorMessage}
              </Text>
            )}
          </div>

          <div className={alertDialogActionsVariants()}>
            <AlertDialog.Cancel asChild>
              <button
                type="button"
                className={alertDialogCancelVariants()}
                disabled={isPending}
              >
                Cancelar
              </button>
            </AlertDialog.Cancel>

            <Button
              onClick={onConfirm}
              disabled={isPending}
              className="min-w-27"
            >
              {isPending ? "Excluindo..." : "Confirmar"}
            </Button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
