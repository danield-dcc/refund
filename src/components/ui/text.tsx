import { createElement, type JSX, type ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const textVariants = tv({
  base: "font-sans text-white ",
  variants: {
    variant: {
      "title-lg": "text-xl leading-6 font-bold",
      "title-md": "text-base leading-6 font-bold",
      "title-sm": "text-sm leading-5 font-bold",
      "body-md": "text-sm leading-6 font-normal",
      "body-sm": "text-xs leading-5 font-normal",
    },
  },
  defaultVariants: {
    variant: "title-sm",
  },
});

interface TextProps extends VariantProps<typeof textVariants> {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: ReactNode;
}

export default function Text({
  as = "span",
  variant,
  className,
  children,
  ...props
}: TextProps) {
  return createElement(
    as,
    {
      className: textVariants({ variant, className }),
      ...props,
    },
    children,
  );
}
