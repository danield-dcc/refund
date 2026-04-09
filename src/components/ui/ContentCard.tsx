import { createElement, type JSX } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const ContentCardVariants = tv({
  base: "bg-white rounded-2xl p-10 border border-gray-400 flex flex-col gap-6",
  variants: {
    size: {
      md: "max-w-lg w-full",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface ContainerProps
  extends VariantProps<typeof ContentCardVariants>,
    React.ComponentProps<"div"> {
  as?: keyof JSX.IntrinsicElements;
}

export default function ContentCard({
  as = "div",
  children,
  className,
  ...props
}: ContainerProps) {
  return createElement(
    as,
    {
      className: ContentCardVariants({ size: "md", className }),
      ...props,
    },
    children,
  );
}
