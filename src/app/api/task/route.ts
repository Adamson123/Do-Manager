import { createTaskSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import simplifyError from "@/utils/simplifyError";

export const POST = async (request: NextRequest) => {
  
        const body = await request.json();
        //validate the request body with zod
        const validation = createTaskSchema.safeParse(body);

        //check if validation is successful
        if (!validation.success) {
            const errors = validation.error.format();

            return NextResponse.json(
                { errMsg: simplifyError(errors)[0] },
                { status: 400 }
            );
        }
        try {
        //create thee task
        const task = await prisma.task.create({
            data: {
                title: body.title,
                description: body.description,
                priority: body.priority,
                User: {
                    connect: {
                        id: body.userId,
                    },
                },
            },
        });

        return NextResponse.json(task, { status: 201 });
    } catch (err) {
        const error = err as Error;
        console.log(error.message, "error post /api/task");
        return NextResponse.json(
            { errMsg: "Error creating task" },
            { status: 500 }
        );
    }
};
