"use server";
import { getTodayAiQuota, getUserById } from "@/data";
import prisma from "../../prisma/client";
import dateISOString from "@/utils/dateISOString";

const getUserAction = async (userId: string) => {
  try {
    const todayAiQuota = await getTodayAiQuota(userId);

    if (!todayAiQuota?.id) {
      //Is there any existing quota
      const existingQuota = await prisma.dailyAiQuota.findUnique({
        where: {
          userId,
        },
      });
      if (existingQuota?.id) {
        //delete existing quota
        await prisma.dailyAiQuota.delete({
          where: {
            userId,
          },
        });
      }
      const day = dateISOString(new Date());
      //create a new quota
      await prisma.dailyAiQuota.create({
        data: {
          day,
          User: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }

    const user = await getUserById(userId);
    if (!user) {
      return { errMsg: "User does not exit" };
    }
    const hasPassword = Boolean(user.password);
    user.password = "";
    return JSON.stringify({ ...user, hasPassword });
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error get -action /user");
    return { errMsg: "Error getting user" };
  }
};

export default getUserAction;
