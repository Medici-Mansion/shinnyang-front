import { type ClassValue, clsx } from "clsx";
import { Control, FieldValue, FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractValueFromControls<T extends FieldValues = FieldValues>(
  control: Control<T>,
) {
  const fields = control._fields;
  const result: { [key: keyof typeof fields]: any } = {};
  Object.entries(fields).forEach((field) => {
    result[field[0]] = field[1]?._f.value || "";
  });
  return result;
}

export function copyURL(url: string) {
  const urls = new URL(window.location.origin);
  urls.pathname = url;
  window.navigator.clipboard.writeText(urls.toString()).then(() => {
    toast.success(`클립보드에 링크가 저장됐어요!`);
  });
}
