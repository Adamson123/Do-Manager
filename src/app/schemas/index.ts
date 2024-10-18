import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title must be at least 1 character.",
    })
    .max(70, {
      message: "Title must not exceed 70 characters.",
    }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 1 character.",
    })
    .max(400, {
      message: "Description must not exceed 400 characters.",
    }),
  priority: z.string().optional(),
});

export const createSubTaskSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title must be at least 1 character.",
    })
    .max(70, {
      message: "Title must not exceed 70 characters.",
    }),
  description: z
    .string()
    .min(1, {
      message: "Description must be at least 1 character.",
    })
    .max(400, {
      message: "Description must not exceed 400 characters.",
    }),
  date: z.date(),
});
