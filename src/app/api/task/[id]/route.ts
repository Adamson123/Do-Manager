import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { createTaskSchema } from "@/schemas";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  });

  if (!task)
    return NextResponse.json({ error: "task was not found" }, { status: 404 });

  await prisma.task.delete({
    where: {
      id,
    },
  });
  const tasks = await prisma.task.findMany();

  return NextResponse.json(tasks, { status: 200 });
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  });
  //checking if task exists
  if (!task)
    return NextResponse.json({ error: "task was not found" }, { status: 404 });

  const body = await request.json();
  const validation = createTaskSchema.safeParse(body);
  //validating task fields
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  await prisma.task.update({
    where: {
      id,
    },
    data: {
      title: body.title,
      description: body.description,
      priority: body.priority,
    },
  });
  const tasks = await prisma.task.findMany();
  //console.log(tasks);

  return NextResponse.json(tasks, { status: 200 });
};
