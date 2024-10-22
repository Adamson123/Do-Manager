import { createTaskSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const validation = createTaskSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const task = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description,
      priority: body.priority,
    },
  });

  return NextResponse.json(task, { status: 201 });
};

export const GET = async (request: NextRequest) => {
  const task = await prisma.task.findMany({
    include: {
      subtasks: true,
    },
  });
  return NextResponse.json(task, { status: 201 });
};
