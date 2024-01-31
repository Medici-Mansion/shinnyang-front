import * as z from "zod";
export enum LETTER_TYPE {
  LETTER = "letter",
  ANSWER = "answer",
}

export const letterFormState = z.object({
  catName: z.enum(["cheezu", "gookie", "umu"]),
  content: z
    .string()
    .min(1, { message: "내용을 적어주세요!" })
    .max(100, { message: "내용은 100자를 넘을 수 없어요." }),
  receiverNickname: z
    .string()
    .min(1, { message: "받는 사람을 입력해주세요." })
    .max(14, { message: "받는 사람의 이름이 너무 길어요." }),
  receiverId: z.string().optional(),
  senderNickname: z
    .string()
    .min(1, { message: "보내는 사람을 입력해주세요." })
    .max(14, { message: "보내는 사람의 이름이 너무 길어요." }),
  letterType: z.enum([LETTER_TYPE.ANSWER, LETTER_TYPE.LETTER]),
  replyMailId: z.string().optional(),
});
export type LetterFormValues = z.infer<typeof letterFormState>;
