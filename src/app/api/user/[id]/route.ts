import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "@/data";

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const user = await getUserById(id);
    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error get /api/user");
    return NextResponse.json(
      { errMsg: "Error gettings user" },
      { status: 500 }
    );
  }
};
