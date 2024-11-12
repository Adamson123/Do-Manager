import prisma from "../../prisma/client";

const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export default getUserByEmail;
