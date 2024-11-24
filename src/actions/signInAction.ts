"use server";
import { signInSchema } from "@/schemas";
import { UserTypes } from "@/types/userTypes";
import simplifyError from "@/utils/simplifyError";
import { signIn } from "../../auth";
import { DEFAULT_SIGNIN_REDIRECT } from "../../route";
import { AuthError } from "next-auth";

const signInAction = async (user: UserTypes) => {
  const validation = signInSchema.safeParse(user);
  //check if validation is successfull
  if (!validation.success) {
    const errors = validation.error.format();
    return { errMsg: simplifyError(errors)[0] };
  }

  const { email, password } = validation.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_SIGNIN_REDIRECT,
    });
  } catch (err) {
    //  const error = err as Error;
    console.log(err, "error post -action /signin");
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return {
            errMsg: "Invalid credentials",
          };
        default:
          return {
            errMsg: "Something went wrong",
          };
      }
    }

    throw err;
  }
};

export default signInAction;
