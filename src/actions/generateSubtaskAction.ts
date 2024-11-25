"use server";
import { SubtaskInitialStateTypes } from "@/features/subtaskSlice";
import generateSpell from "@/utils/generateSpell";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../../prisma/client";
import { SubtaskTypes } from "@/types/subtaskTypes";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateSubtask = async (
  userId: string,
  existingData: SubtaskInitialStateTypes
) => {
  try {
    const prompt = generateSpell(existingData);
    const reply = await model.generateContent(prompt);

    const text = reply.response.text();
    const extractedJson = text.replace(/```/g, "").replace(/json/, "");
    console.log(text);
    const parsedSubtask = JSON.parse(extractedJson).map(
      (subtask: SubtaskTypes) => ({
        ...subtask,
        userId,
        taskId: existingData.taskId,
      })
    );

    await prisma.subtask.createMany({
      data: parsedSubtask,
    });

    const subtasks = prisma.subtask.findMany({
      where: { taskId: existingData.taskId },
    });
    return subtasks;
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error post generate-subtask -action /subtask");
    return { errMsg: "Error generating subtask" };
  }
};

export default generateSubtask;
