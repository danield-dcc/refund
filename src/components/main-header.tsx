import type { ComponentProps } from "react";
import { Link, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import LogoImg from "../assets/Logo.svg?react";
import Button from "./ui/button";
import Container from "./ui/container";
import Text from "./ui/text";

interface MainHeaderProps extends ComponentProps<typeof Container> {}

export default function MainHeader({ className, ...props }: MainHeaderProps) {
  const navigate = useNavigate();

  return (
    <Container
      as="header"
      className={twMerge("flex justify-between items-center gap-10", className)}
      {...props}
    >
      <Link to="/">
        <LogoImg className="h-7" />
      </Link>

      <div className="flex items-center gap-4">
        <Text className="text-green-100">Solicitações de reembolso</Text>
        <Button onClick={() => navigate("/new-refund")}>
          Nova Solicitação
        </Button>
      </div>
    </Container>
  );
}
