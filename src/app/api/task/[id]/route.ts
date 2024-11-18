import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { createTaskSchema } from "@/schemas";
import simplifyError from "@/utils/simplifyError";

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const task = await prisma.task.findMany({
      where: { userId: id },
      include: {
        subtasks: true,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error get /api/task");
    return NextResponse.json(
      { errMsg: "Error gettings tasks" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
 
    const { id } = params;
    try {
    //finding task to check if it's exists
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    //Checking if it's exists
    if (!task)
      return NextResponse.json(
        { errMsg: "Task was not found" },
        { status: 404 }
      );

    //delete the task's subtasks
    await prisma.subtask.deleteMany({
      where: {
        taskId: id,
      },
    });

    //delete the task itself
    await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ id }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error delete /api/task");
    return NextResponse.json(
      { errMsg: "Error deleting task" },
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

    //finding task to check if it's exists
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });
    //checking if task exists
    if (!task)
      return NextResponse.json(
        { errMsg: "Task was not found" },
        { status: 404 }
      );

    const body = await request.json();
    const validation = createTaskSchema.safeParse(body);
    //validating task fields
    if (!validation.success) {
      const errors = validation.error.format();

      return NextResponse.json(
        { errMsg: simplifyError(errors)[0] },
        { status: 400 }
      );
    }

    //update the task
    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        description: body.description,
        priority: body.priority,
      },
      include: {
        subtasks: true,
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error patch /api/task");
    return NextResponse.json({ errMsg: "Error editing task" }, { status: 500 });
  }
};
