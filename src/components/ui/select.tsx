import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import Text from "./text";

export const selectContainerVariants = tv({
  base: "flex flex-col gap-1 [&:has(select:focus)>label]:text-green-100 [&:has(select:focus)>label]:font-bold",
});

export const selectWrapperVariants = tv({
  base: `border border-solid focus-within:border-green-100 rounded flex items-center gap-2`,
  variants: {
    variant: {
      default: "border-gray-300 bg-transparent",
      ghost: "border-transparent bg-white/5",
      filled: "border-transparent bg-gray-700",
    },
    size: {
      md: "h-12 px-3",
    },
    disabled: {
      true: "pointer-events-none opacity-50",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    disabled: false,
  },
});

const selectLabelVariants = tv({
  base: "text-gray-200 text-[10px]",
});

export const selectElementVariants = tv({
  base: "appearance-none bg-transparent outline-none flex-1 cursor-pointer",
  variants: {
    variant: {
      default: "text-gray-200",
      ghost: "text-gray-200/70",
      filled: "text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SelectOption {
  key: string;
  value: string;
}

interface SelectProps
  extends VariantProps<typeof selectWrapperVariants>,
    Omit<ComponentProps<"select">, "size" | "disabled"> {
  label: string;
  error?: ReactNode;
  placeholder?: string;
  options?: SelectOption[];
}

export default function Select({
  variant,
  size,
  disabled,
  className,
  label,
  error,
  placeholder,
  options,
  children,
  id,
  ...props
}: SelectProps) {
  return (
    <div className={selectContainerVariants({ className })}>
      <label htmlFor={id} className={selectLabelVariants()}>
        {label}
      </label>
      <div className={selectWrapperVariants({ variant, size, disabled })}>
        <select
          id={id}
          className={selectElementVariants({ variant })}
          disabled={disabled as boolean}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options?.map(({ key, value }) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
          {children}
        </select>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-200 pointer-events-none shrink-0"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {error && (
        <Text variant="body-sm" className="text-green-200">
          {error}
        </Text>
      )}
    </div>
  );
}
