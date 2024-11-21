import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatPrice = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
});

export default formatPrice;
