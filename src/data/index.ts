import prisma from "../../prisma/client";

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    }
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
