"use server";

import bcrypt from "bcryptjs";
import { getPasswordResetTokenByToken, getUserByEmail } from "@/data";
import prisma from "../../prisma/client";

const newPasswordAction = async (password: string, token: string) => {
  if (!token) return { errMsg: "Missing token" };

  try {
    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) return { errMsg: "Token is invalid" };

    const user = await getUserByEmail(existingToken.email);
    if (!user) return { errMsg: "Email does not exsit" };

    const isTokenExpired = new Date(existingToken.expires) < new Date();
    if (isTokenExpired) return { errMsg: "Token has expired" };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return { successMsg: "Password updated" };
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error patch -action /new-password");
    return { errMsg: "Error updating password" };
  }
};

export default newPasswordAction;
