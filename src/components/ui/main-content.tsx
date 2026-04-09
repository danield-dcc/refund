import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface MainContentProps extends ComponentProps<"main"> {}

export default function MainContent({
  children,
  className,
  ...props
}: MainContentProps) {
  return (
    <main
      className={twMerge("max-w-270.5 mt-10 mx-auto", className)}
      {...props}
    >
      {children}
    </main>
  );
}
