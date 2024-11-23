"use server";

import prisma from "../../prisma/client";
import { deleteExistingImage } from "./updateProfileAction";

const deleteAccountAction = async (userId: string, image: string) => {
  if (!userId) {
    return;
  }
  try {
    await Promise.all([
      prisma.subtask.deleteMany({ where: { userId } }),
      prisma.task.deleteMany({ where: { userId } }),
      prisma.subtaskCompletionHistory.deleteMany({ where: { userId } }),
      prisma.account.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
      deleteExistingImage(image),
    ]);
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    return { errMsg: "Error deleting account" };
  }
};

export default deleteAccountAction;
