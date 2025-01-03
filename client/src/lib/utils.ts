import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const daysLeft = (deadline: bigint) => {
  const today = BigInt(new Date().getTime()); // Convert today's timestamp to bigint
  const deadlineInMillis = deadline * BigInt(1000); // Convert deadline to milliseconds
  const millisecondsInADay = BigInt(1000 * 60 * 60 * 24); // Use bigint for calculations

  const remainingDays = Number((deadlineInMillis - today) / millisecondsInADay); // Calculate days and convert to number  
  return remainingDays;
};

export const titleToSlug = (title: string) => {
  return title.toLowerCase().replace(/ /g, "-");
}