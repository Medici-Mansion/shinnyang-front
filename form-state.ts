import * as z from "zod";
export const letterFormState = z.object({
  catName: z.enum(["cheezu", "gookie", "umu"]),
  content: z.string().min(1).max(100),
  receiverNickname: z.string().min(1),
  senderNickname: z.string().optional()
});
export type LetterFormValues = z.infer<typeof letterFormState>;
