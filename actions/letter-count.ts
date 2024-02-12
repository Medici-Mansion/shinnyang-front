"use server";
import { getTotalLetterCount } from "@/apis";

export const getLetterCount = async () => {
  "use server";

  const totalLetterCount = await getTotalLetterCount();
  return totalLetterCount;
};
