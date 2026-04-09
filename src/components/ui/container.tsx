import type { JSX } from "react";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const ContainerVariants = tv({
  base: "mx-auto",
  variants: {
    size: {
      md: "max-w-298.75 px-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface ContainerProps
  extends VariantProps<typeof ContainerVariants>,
    React.ComponentProps<"div"> {
  as?: keyof JSX.IntrinsicElements;
}

export default function Container({
  as = "div",
  children,
  className,
  ...props
}: ContainerProps) {
  return React.createElement(
    as,
    {
      className: ContainerVariants({ size: "md", className }),
      ...props,
    },
    children,
  );
}
