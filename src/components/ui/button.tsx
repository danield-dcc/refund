import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import Text from "./text";

export const buttonVariants = tv({
  base: "flex items-center justify-center cursor-pointer transition rounded group gap-1",
  variants: {
    variant: {
      primary: "bg-green-100 hover:bg-green-200",
    },
    size: {
      md: "h-12 py-3.75 px-5",
    },
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    disabled: false,
  },
});

export const buttonTextVariants = tv({
  variants: {
    variant: {
      primary: "text-white",
    },
    size: {
      sm: "text-sm font-bold",
      md: "text-md font-bold",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
  },
});

interface ButtonProps
  extends Omit<ComponentProps<"button">, "size" | "disabled">,
    VariantProps<typeof buttonVariants> {}

export default function Button({
  variant,
  size,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({ variant, size, disabled, className })}
      disabled={disabled as boolean}
      {...props}
    >
      <Text
        variant="title-sm"
        className={buttonTextVariants({ variant, size })}
      >
        {children}
      </Text>
    </button>
  );
}
