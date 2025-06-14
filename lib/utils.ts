import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomId() {
  // generate a random id based on the timestamp
  const timestamp = Date.now();

  const reversed = timestamp.toString().split("").reverse().join("");
  const mid = Math.floor(reversed.length / 2);
  const isOdd = reversed.length % 2 !== 0;

  const firstHalf = reversed.slice(0, mid);
  const secondHalf = reversed.slice(isOdd ? mid + 1 : mid);
  const middle = isOdd ? reversed[mid] : "";

  const swapped = secondHalf + middle + firstHalf;
  return parseInt(swapped, 10);
}
