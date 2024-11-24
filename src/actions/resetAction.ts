"use server";

import { getPasswordResetTokenByEmail, getUserByEmail } from "@/data";
import { resetSchema } from "@/schemas";
import simplifyError from "@/utils/simplifyError";
import prisma from "../../prisma/client";
import { v4 as uuidv4 } from "uuid";
import sendPasswordResetLink from "@/lib/mail";

const resetAction = async (value: { email: string }) => {
  const validation = resetSchema.safeParse(value);

  if (!validation.success) {
    const errors = validation.error.format();
    return { errMsg: simplifyError(errors)[0] };
  }

  const { email } = validation.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) return { errMsg: "Email not found" };

    //1. Have We already sent a token to the user?
    const existingUserToken = await getPasswordResetTokenByEmail(email);

    //2. If yes
    if (existingUserToken) {
      //3. Delete the existing token
      await prisma.passwordResetToken.delete({
        where: {
          id: existingUserToken.id,
        },
      });
    }

    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 60 * 60);

    //4. Then a create a new one
    const newResetPasswordToken = await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    await sendPasswordResetLink(
      newResetPasswordToken.email,
      newResetPasswordToken.token
    );

    return {
      successMsg: `Reset email sent. \n Note: if you can't see it in inbox check spam.`,
    };
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error post -action /reset");
    return { errMsg: "Error sending reset link" };
  }
};

export default resetAction;
