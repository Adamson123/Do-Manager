"use server";
import { getUserByEmail } from "@/data";
import { signUpSchema } from "@/schemas";
import prisma from "../../prisma/client";
import { UserTypes } from "@/types/userTypes";
import bcrypt from "bcryptjs";
import simplifyError from "@/utils/simplifyError";
import { DEFAULT_SIGNIN_REDIRECT } from "../../route";
import { signIn } from "../../auth";

const signUpAction = async (user: UserTypes) => {
  try {
    const validation = signUpSchema.safeParse(user);
    //check if validation is successful
    if (!validation.success) {
      const errors = validation.error.format();
      return { errMsg: simplifyError(errors)[0] };
    }

    const { name, email, password } = validation.data;
    const userExist = await getUserByEmail(email);
    if (userExist) return { errMsg: "Email already in use" };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    //return { successMsg: "User created successfully" };
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_SIGNIN_REDIRECT,
    });
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error post -action /signup");
    //return { errMsg: "Something went wrong" };
    throw err;
  }
};

export default signUpAction;
