import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { createSubtaskSchema } from "@/schemas";
import simplifyError from "@/utils/simplifyError";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    //finding subtask to check if it's exists
    const subtask = await prisma.subtask.findUnique({
      where: {
        id,
      },
    });

    //Checking if it's exists
    if (!subtask)
      return NextResponse.json(
        { errMsg: "Subtask was not found" },
        { status: 404 }
      );

    //delete the subtask itself
    await prisma.subtask.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ id, taskId: subtask.taskId }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error delete /api/subtask");
    return NextResponse.json(
      { errMsg: "Error deleting subtask" },
      { status: 500 }
    );
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const subtask = await prisma.subtask.findUnique({
      where: {
        id,
      },
    });

    //checking if tsbask exists
    if (!subtask)
      return NextResponse.json(
        { errMsg: "Subtask was not found" },
        { status: 404 }
      );

    const body = await request.json();
    const validation = createSubtaskSchema.safeParse(body);
    //validating task fields
    if (!validation.success) {
      const errors = validation.error.format();

      return NextResponse.json(
        { errMsg: simplifyError(errors)[0] },
        { status: 400 }
      );
    }

    const updatedSubtask = await prisma.subtask.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        description: body.description,
        completed: body.completed,
        dateCompleted: body.dateCompleted,
        favorite: body.favorite,
        dueDate: body.dueDate,
      },
    });

    // const tasks = await prisma.task.findMany({
    //   include: {
    //     subtasks: true,
    //   },
    // });

    return NextResponse.json(updatedSubtask, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error patch /api/subtask");
    return NextResponse.json(
      { errMsg: "Error editing subtask" },
      { status: 500 }
    );
  }
};
