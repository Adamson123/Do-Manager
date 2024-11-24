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
    })
    .trim(),
  description: z
    .string({
      message: "Description must be at least 1 character",
    })
    .max(400, {
      message: "Description must not exceed 400 characters.",
    })
    .trim()
    .optional(),
  priority: z.string({
    message: "A valid priority level must be provided",
  }),
  userId: z.string({ message: "A valid user id must be provided" }),
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
    })
    .trim(),
  description: z
    .string({
      message: "Description must be at least 1 character.",
    })
    // .min(1, {
    //   message: "Description must be at least 1 character.",
    // })
    .max(400, {
      message: "Description must not exceed 400 characters.",
    })
    .trim()
    .optional(),
  dueDate: z.string({
    message: "A valid due date must be provided",
  }),
  taskId: z.string({ message: "A valid task id must be provided" }),
  userId: z.string({ message: "A valid user id must be provided" }),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").trim(),
  email: z.string().email("Please enter a valid email address").trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address").trim(),
  password: z.string({ message: "Please enter your password" }),
});

export const resetSchema = z.object({
  email: z.string().email("Please enter a valid email address").trim(),
});

export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").trim(),
  image: z
    .union([z.instanceof(File), z.string(), z.instanceof(Blob)])
    .optional()
    .refine((file) => {
      if (!file) {
        return true;
      } else {
        if (typeof file !== "string") return file.type.startsWith("image/");
      }
    })
    .refine(
      (file) => {
        if (!file) {
          return true;
        } else {
          if (typeof file !== "string") return file.size <= 5 * 1024 * 1024;
        }
      },
      {
        message: "File must be an image (e.g., PNG,JPG,JPEG, etc.)",
      }
    ),
  userId: z.string({ message: "A valid user id must be provided" }),
});

export const passwordSchema = z
  .object({
    hasPassword: z.boolean(), // Indicates if the user has an existing password
    currentPassword: z.string().optional(), // Conditionally required
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    userId: z.string({ message: "A valid user id must be provided" }),
  })
  .superRefine((data, ctx) => {
    // If the user has a password, currentPassword is required
    if (data.hasPassword && !data.currentPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["currentPassword"],
        message: "Current password is required",
      });
    }

    // Ensure newPassword and confirmPassword match
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
      ctx.addIssue({
        code: "custom",
        path: ["newPassword"],
        message: "Passwords do not match",
      });
    }
  });
