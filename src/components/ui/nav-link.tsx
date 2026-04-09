import {
  NavLink as RouterNavLink,
  type NavLinkProps as RouterNavLinkProps,
} from "react-router";
import { tv, type VariantProps } from "tailwind-variants";

export const navLinkVariants = tv({
  base: "transition cursor-pointer text-gray-200 hover:text-green-100",
  variants: {
    active: {
      true: "text-green-100",
    },
  },
  defaultVariants: {
    active: false,
  },
});

interface NavLinkProps
  extends Omit<RouterNavLinkProps, "className">,
    VariantProps<typeof navLinkVariants> {
  className?: string;
}

export default function NavLink({
  className,
  children,
  ...props
}: NavLinkProps) {
  return (
    <RouterNavLink
      className={({ isActive }) =>
        navLinkVariants({ active: isActive, className })
      }
      {...props}
    >
      {children}
    </RouterNavLink>
  );
}
