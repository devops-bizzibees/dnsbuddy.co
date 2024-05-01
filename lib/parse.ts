import type { parsedMxRecords } from "@/types/parse";

export function parseMxRecords(records: string[]): parsedMxRecords[] {
  return records
    .map((record) => {
      const [priorityStr, value] = record.split(" ");
      const priority = Number.parseInt(priorityStr);
      return { priority, value };
    })
    .filter((record) => record.value !== undefined)
    .sort((a, b) => a.priority - b.priority);
}

export function parseSpfRecords(records: string[]): string[] {
  const parsedRecords: string[] = [];
  records.map((record) => {
    if (record.startsWith('"v=spf1')) {
      parsedRecords.push(record.substring(1, record.length - 1));
    }
  });
  return parsedRecords;
}
