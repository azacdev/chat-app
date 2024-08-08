import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import {
  format,
  differenceInHours,
  differenceInDays,
  isYesterday,
} from "date-fns";

export const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const now = new Date();

  const hoursDifference = differenceInHours(now, date);
  const daysDifference = differenceInDays(now, date);

  if (hoursDifference < 24) {
    return format(date, "HH:mm"); // Return time if within the last 24 hours
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return format(date, "yyyy-MM-dd"); // Return date if older than yesterday
};
