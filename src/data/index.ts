import dateISOString from "@/utils/dateISOString";
import prisma from "../../prisma/client";

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      subtaskCompletionHistory: true,
      dailyAiQuota: true,
    },
  });
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  return await prisma.passwordResetToken.findFirst({
    where: {
      email,
    },
  });
};

export const getPasswordResetTokenByToken = async (token: string) => {
  return await prisma.passwordResetToken.findFirst({
    where: {
      token,
    },
  });
};

export const getTodayAiQuota = async (userId: string) => {
  const day = dateISOString(new Date());
  return await prisma.dailyAiQuota.findFirst({
    where: {
      day,
      userId,
    },
  });
};
