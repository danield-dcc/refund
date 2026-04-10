import BedIcon from "../assets/icons/bed.svg?react";
import CutleryIcon from "../assets/icons/cutlery.svg?react";
import CarIcon from "../assets/icons/police_car.svg?react";
import ReceiptIcon from "../assets/icons/receipt.svg?react";
import WrenchIcon from "../assets/icons/wrench.svg?react";

export const _CATEGORY_ICON = {
  food: CutleryIcon,
  hosting: BedIcon,
  transport: CarIcon,
  services: WrenchIcon,
  other: ReceiptIcon,
} as const;

export const _CATEGORY_NAMES = {
  food: "Alimentação",
  hosting: "Hospedagem",
  transport: "Transporte",
  services: "Serviços",
  other: "Outros",
} as const;
