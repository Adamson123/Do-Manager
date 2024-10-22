import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { createSubtaskSchema } from "@/schemas";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validation = createSubtaskSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
