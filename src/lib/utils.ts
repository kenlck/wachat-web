import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toCamelCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/[-_&().]/g, " ") // Replace all separators (- _ & ( ) .) with space
    .replace(/\s+(.)/g, (_, char: string) => char.toUpperCase()) // Capitalize letters after spaces
    .replace(/\s/g, ""); // Remove remaining spaces
}
