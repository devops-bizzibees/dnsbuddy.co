import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_e) {
    return false;
  }
};

export function extractRootDomain(url: string) {
  let modifiedUrl = url;
  if (modifiedUrl.endsWith(".")) {
    modifiedUrl = modifiedUrl.slice(0, -1);
  }
  const urlObj = new URL(`http://${modifiedUrl}`);
  const parts = urlObj.hostname.split(".");
  const rootDomain = parts.slice(-2).join(".");
  return rootDomain;
}

export const isValidDomain = (url: string): boolean => {
  if (url.startsWith("http://")) {
    return false;
  }
  if (url.startsWith("http//")) {
    return false;
  }
  if (url.startsWith("www.")) {
    return false;
  }
  return true;
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const stringToList = (string: string): string[] => {
  const stringArray = string.split("\n");
  return stringArray;
};

export const bulkLengthCheck = (string: string): boolean => {
  const list = stringToList(string);
  return list.length <= 10_000;
};

export const isValidIpAddressV4 = (ipAddress: string): boolean => {
  const ipRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
  return ipRegex.test(ipAddress);
};

export const isValidIpAddressV6 = (ipAddress: string): boolean => {
  // Updated to this from Regexr: regexr.com/3bu43
  const ipRegexV6 = /^(([a-fA-F0-9]{1,4}|):){1,7}([a-fA-F0-9]{1,4}|:)$/;
  return ipRegexV6.test(ipAddress);
};

export const isValidASN = (asn: string): boolean => {
  const asnRegex = /^(^AS)?[0-9]+$/;
  return asnRegex.test(asn);
};

export const timeUnix = (): number => {
  return Number.parseInt((new Date().getTime() / 1000).toFixed(0));
};
