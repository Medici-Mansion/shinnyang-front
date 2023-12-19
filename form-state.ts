import * as z from "zod";
export const letterFormState = z.object({
  catType: z.enum(["cheezu", "gookie", "umu"]),
  letterContent: z.string().min(1).max(100),
  to: z.string().min(1),
  // from: z.string().min(1),
});
export type LetterFormValues = z.infer<typeof letterFormState>;
