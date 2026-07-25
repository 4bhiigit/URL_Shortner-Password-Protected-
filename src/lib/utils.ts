import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 6-character random alphanumeric generator
const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  6
);

export function generateShortCode(): string {
  return nanoid();
}

export function isValidUrl(urlString: string): boolean {
  try {
    const parsed = new URL(urlString);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateAlias(alias: string): { valid: boolean; message?: string } {
  if (!alias) return { valid: true };
  
  const trimmed = alias.trim();
  if (trimmed.length < 3) {
    return { valid: false, message: "Custom alias must be at least 3 characters long." };
  }
  if (trimmed.length > 50) {
    return { valid: false, message: "Custom alias cannot exceed 50 characters." };
  }
  // Allow letters, numbers, hyphens, underscores, and dots
  const aliasRegex = /^[a-zA-Z0-9_.-]+$/;
  if (!aliasRegex.test(trimmed)) {
    return { valid: false, message: "Alias can only contain letters, numbers, hyphens, underscores, and dots." };
  }
  
  // Reserved words list
  const reserved = ["api", "not-found", "404", "stats", "shorten", "favicon.ico", "robots.txt"];
  if (reserved.includes(trimmed.toLowerCase())) {
    return { valid: false, message: "This alias is a reserved system keyword." };
  }

  return { valid: true };
}

// Expiration helpers (in seconds)
export const EXPIRATION_OPTIONS = [
  { label: "Never", value: 0 },
  { label: "1 Hour", value: 3600 },
  { label: "24 Hours", value: 86400 },
  { label: "7 Days", value: 604800 },
  { label: "30 Days", value: 2592000 },
];
