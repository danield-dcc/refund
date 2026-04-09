import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import Text from "./text";

export const inputTextContainerVariants = tv({
  base: "flex flex-col gap-1 [&:has(input:focus)>label]:text-green-100 [&:has(input:focus)>label]:font-bold ",
});

export const inputTextWrapperVariants = tv({
  base: `border border-solid border-gray-300 focus-within:border-green-100 bg-transparent
  rounded flex items-center gap-3`,
  variants: {
    size: {
      md: "h-12 p-3",
    },
    disabled: {
      true: "pointer-events-none",
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
});

const InputLabelVariants = tv({
  base: "text-gray-200 text-[10px]",
});

interface InputTextProps
  extends VariantProps<typeof inputTextWrapperVariants>,
    Omit<ComponentProps<"input">, "size" | "disabled"> {
  error?: ReactNode;
  label?: string;
}

export const inputTextVariants = tv({
  base: "bg-transparent outline-none placeholder:text-placeholder text-gray-200 flex-1",
});

export default function InputText({
  size,
  disabled,
  className,
  error,
  label,
  id,
  ...props
}: InputTextProps) {
  return (
    <div className={inputTextContainerVariants({ className })}>
      <label htmlFor={id} className={InputLabelVariants()}>
        {label}
      </label>
      <div className={inputTextWrapperVariants({ size, disabled })}>
        <input
          id={id}
          className={inputTextVariants()}
          disabled={disabled as boolean}
          {...props}
        />
      </div>
      {error && (
        <Text variant="body-sm" className="text-green-200">
          {error}
        </Text>
      )}
    </div>
  );
}
