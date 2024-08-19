export function formatToSlashStyle(date: string | Date) {
  if (!date) return "";
  const isoString = date instanceof Date ? date.toISOString() : date;
  return isoString.split("T")[0].split("-").reverse().join("/");
}

export function formatFromFormToPayload(date: string) {
  return date.split("/").reverse().join("-");
}

export function formatFromSlashStyleToDate(date: string) {
  const [day, month, year] = date.split("/").map(Number);
  return new Date(year, month - 1, day);
}
