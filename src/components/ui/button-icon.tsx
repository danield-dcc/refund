import { tv, type VariantProps } from "tailwind-variants";
import Icon from "./icon";

export const buttonIconVariants = tv({
  base: "inline-flex items-center justify-center cursor-pointer transition",
  variants: {
    variant: {
      primary: "bg-green-100 hover:bg-green-200",
    },
    size: {
      md: "w-12 h-12 p-2 rounded",
    },
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
    handling: {
      true: "pointer-events-none",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    disabled: false,
  },
});

export const buttonIconIconVariants = tv({
  variants: {
    variant: {
      primary: "fill-white ",
    },
    size: {
      md: "max-w-6 max-h-6",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

interface ButtonIconProps
  extends VariantProps<typeof buttonIconVariants>,
    Omit<React.ComponentProps<"button">, "size" | "disabled"> {
  icon: React.ComponentProps<typeof Icon>["svg"];
  handling?: boolean;
  iconClassName?: string;
}

export default function ButtonIcon({
  variant,
  size,
  disabled,
  className,
  icon,
  handling,
  iconClassName,
  ...props
}: ButtonIconProps) {
  return (
    <button
      className={buttonIconVariants({
        variant,
        size,
        disabled,
        className,
        handling,
      })}
      {...props}
    >
      <Icon
        svg={icon}
        animate={handling}
        className={buttonIconIconVariants({
          variant,
          size,
          className: iconClassName,
        })}
      />
    </button>
  );
}
