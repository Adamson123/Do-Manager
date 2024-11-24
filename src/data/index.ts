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
