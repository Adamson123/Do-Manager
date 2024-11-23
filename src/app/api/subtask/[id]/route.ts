import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { createSubtaskSchema } from "@/schemas";
import simplifyError from "@/utils/simplifyError";
import dateISOString from "@/utils/dateISOString";

export const DELETE = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
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
  const { id } = params;
  try {
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
        // dateCompleted: body.dateCompleted,
        favorite: body.favorite,
        dueDate: body.dueDate,
      },
    });

    let subtaskCompletionHistory: any = [];

    if (body.sideUpdate === "completion") {
      const day = dateISOString(new Date());
      const { completed, userId } = body;
      const completionHistoryExist =
        await prisma.subtaskCompletionHistory.findFirst({
          where: {
            day,
            userId,
          },
        });

      if (completionHistoryExist) {
        let subtasksCompleted = [];
        if (!completionHistoryExist.subtasksCompleted.includes(id)) {
          subtasksCompleted = [...completionHistoryExist.subtasksCompleted, id];
        } else {
          subtasksCompleted = completionHistoryExist.subtasksCompleted.filter(
            (subtaskId) => subtaskId !== id
          );
        }
        subtaskCompletionHistory = await prisma.subtaskCompletionHistory.update(
          {
            where: {
              day,
              userId,
              id: completionHistoryExist.id,
              //TODO
            },
            data: {
              subtasksCompleted: {
                set: subtasksCompleted,
              },
            },
          }
        );
      } else {
        subtaskCompletionHistory = await prisma.subtaskCompletionHistory.create(
          {
            data: {
              day,
              subtasksCompleted: {
                set: completed ? [id] : [],
              },
              User: {
                connect: {
                  id: userId,
                },
              },
            },
          }
        );
      }
    }

    return NextResponse.json(
      { subtask: updatedSubtask, subtaskCompletionHistory },
      { status: 200 }
    );
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error patch /api/subtask");
    return NextResponse.json(
      { errMsg: "Error editing subtask" },
      { status: 500 }
    );
  }
};
