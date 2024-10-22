import * as z from "zod";

export const contentSchema = z.object({
  content: z
    .string()
    .min(2, {
      message: "Content should be at-least 2 characters.",
    })
    .max(150, {
      message: "Content can't exceed more than 150 characters.",
    }),
});

export type contentSchema = z.infer<typeof contentSchema>;
