import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { createSubtaskSchema } from "@/schemas";
import simplifyError from "@/utils/simplifyError";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const validation = createSubtaskSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.format();

    return NextResponse.json(
      { errMsg: simplifyError(errors)[0] },
      { status: 400 }
    );
  }
  try {
    const subtask = await prisma.subtask.create({
      data: {
        title: body.title,
        description: body.description,
        dueDate: body.dueDate,
        Task: {
          connect: {
            id: body.taskId,
          },
        },
      },
    });

    return NextResponse.json(subtask, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error post /api/subtask");
    return NextResponse.json(
      { errMsg: "Error creating subtask" },
      { status: 500 }
    );
  }
};
