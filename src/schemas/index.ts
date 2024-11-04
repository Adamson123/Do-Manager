import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string({
      message: "Title must be at least 1 character.",
    })
    .min(1, {
      message: "Title must be at least 1 character.",
    })
    .max(70, {
      message: "Title must not exceed 70 characters.",
    }),
  description: z
    .string({
      message: "Description must be at least 1 character",
    })
    .min(2, {
      message: "Description must be at least 1 character.",
    })
    .max(400, {
      message: "Description must not exceed 400 characters.",
    }),
  priority: z.string({
    message: "A valid priority level must be provided",
  }),
});

export const createSubtaskSchema = z.object({
  title: z
    .string({
      message: "Title must be at least 1 character.",
    })
    .min(1, {
      message: "Title must be at least 1 character.",
    })
    .max(70, {
      message: "Title must not exceed 70 characters.",
    }),
  description: z
    .string({
      message: "Description must be at least 1 character.",
    })
    .min(1, {
      message: "Description must be at least 1 character.",
    })
    .max(400, {
      message: "Description must not exceed 400 characters.",
    }),
  dueDate: z.string({
    message: "A valid due date must be provided",
  }),
  taskId: z.string({ message: "A valid task id must be provided" }).min(36, {
    message: "A valid task id must be provided",
  }),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const logInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string({ message: "Please enter your password" }),
});
