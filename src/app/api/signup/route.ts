import { signUpSchema } from "@/schemas";
import simplifyError from "@/utils/simplifyError";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../../prisma/client";
import getUserByEmail from "@/data/getUserByEmail";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validation = signUpSchema.safeParse(body);
    //check if validation is successful
    if (!validation.success) {
      const errors = validation.error.format();
      return NextResponse.json(
        { errMsg: simplifyError(errors)[0] },
        { status: 400 }
      );
    }

    const { name, email, password } = body;

    const user = await getUserByEmail(email);

    if (user)
      return NextResponse.json(
        { errMsg: "Email already in use" },
        { status: 400 }
      );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { successMsg: "User created successfully" },
      { status: 201 }
    );
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error post /api/signup");
    return NextResponse.json(
      { errMsg: "Something went wrong" },
      { status: 500 }
    );
  }
};
