"use server";
import { getTotalLetterCount } from "@/apis";

export const getLetterCount = async () => {
  "use server";

  try {
    const totalLetterCount = await getTotalLetterCount();
    return totalLetterCount;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
