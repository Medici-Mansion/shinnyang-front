import { type ClassValue, clsx } from "clsx";
import { Control, FieldValues } from "react-hook-form";
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

const LINE_FEED = 10; // '\n'

export function getByteLength(decimal: number) {
  return decimal >> 7 || LINE_FEED === decimal ? 2 : 1;
}

export function getLimitedByteText(inputText: string, maxByte: number) {
  const characters = inputText.split("");

  return (
    characters.reduce((acc, cur) => {
      const decimal = cur.charCodeAt(0);
      const byte = getByteLength(decimal); // 글자 한 개가 몇 바이트 길이인지 구해주기
      return acc + byte;
    }, 0) <= maxByte
  );
}
