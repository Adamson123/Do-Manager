import { signInSchema } from "@/schemas";
import simplifyError from "@/utils/simplifyError";
import { NextRequest, NextResponse } from "next/server";
import { signIn } from "../../../../auth";
import { DEFAULT_SIGNIN_REDIRECT } from "../../../../route";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export const POST = async (request: NextRequest) => {
  try {
    console.log("works");
    const body = await request.json();
    const validation = signInSchema.safeParse(body);

    //check if validation is successful
    if (!validation.success) {
      const errors = validation.error.format();
      return NextResponse.json(
        { errMsg: simplifyError(errors)[0] },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_SIGNIN_REDIRECT,
    });
    // redirect(DEFAULT_SIGNIN_REDIRECT);
  } catch (err) {
    let errMsg = "";
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          errMsg = "Invalid credentials";
          break;
        default:
          errMsg = "Something went wrong";
          break;
      }
    }

    const error = err as Error;
    console.log(error.message, "error post /api/signin");
    if (errMsg) {
      return NextResponse.json({ errMsg }, { status: 500 });
    }
    throw errMsg;
  }
};
