import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const daysLeft = (deadline: number) => {
  const today = new Date().getTime();
  const remainingDays = Math.floor((deadline - today) / (1000 * 60 * 60 * 24));
  return remainingDays;
}