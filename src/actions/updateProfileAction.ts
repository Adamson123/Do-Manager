"use server";
import fs from "fs/promises";
import prisma from "../../prisma/client";

const updateProfileAction = async (formData: FormData) => {
  const { info, image } = Object.fromEntries(formData.entries()) as {
    info: string;
    image: File;
  };

  const { name, userId } = JSON.parse(info);
  if (image) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        image: userId,
      },
    });
    const data = await image.arrayBuffer();
    await fs.writeFile(
      `${process.cwd()}/public/images/${userId}.webp`,
      Buffer.from(data)
    );
  } else {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
      },
    });
  }
};

export default updateProfileAction;
