"use server";
import { getUserById } from "@/data";
import { passwordSchema } from "@/schemas";
import simplifyError from "@/utils/simplifyError";
import bcrypt from "bcryptjs";
import * as z from "zod";
import prisma from "../../prisma/client";

const updatePasswordAction = async (
  passwordInput: z.infer<typeof passwordSchema>
) => {
  const validation = passwordSchema.safeParse(passwordInput);

  //check if validation is successful
  if (!validation.success) {
    const errors = validation.error.format();
    return { errMsg: simplifyError(errors)[0] };
  }

  const { hasPassword, newPassword, currentPassword, userId } = validation.data;

  try {
    const user = await getUserById(userId);

    if (hasPassword) {
      const passwordMatch = await bcrypt.compare(
        currentPassword as string,
        user?.password as string
      );

      if (!passwordMatch)
        return { errMsg: "Current password inputed is incorrect" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    //TODO: Don't include password
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
      
    });
    updatedUser.password = "";
    return { updatedUser, hasPassword: true };
  
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error patch password -action /user");
    return { errMsg: "Error updating password" };
  }
};

export default updatePasswordAction;
