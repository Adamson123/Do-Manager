"use server";
import fs from "fs/promises";
import prisma from "../../prisma/client";
import { profileSchema } from "@/schemas";
import simplifyError from "@/utils/simplifyError";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

const deleteExistImage = async (imageId: string) => {
  const existingImage = (
    await fs.readdir(`${process.cwd()}/public/images`)
  ).find((path) => path.split(".")[0] === imageId);

  console.log(existingImage, imageId);
  existingImage &&
    (await fs.unlink(`${process.cwd()}/public/images/${existingImage}`));
};

const updateProfileAction = async (formData: FormData) => {
  const profile = Object.fromEntries(formData.entries()) as z.infer<
    typeof profileSchema
  > & { imageId: string };

  const validation = profileSchema.safeParse(profile);
  //check if validation is successful
  if (!validation.success) {
    const errors = validation.error.format();
    return { errMsg: simplifyError(errors)[0] };
  }

  const { name, userId, image } = validation.data;

  let user;
  try {
    if (image) {
      const imageId = uuidv4();
      user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          image: imageId,
        },
      });

      //delete previous image
      const { imageId: oldImageId } = profile;
      if (oldImageId && !oldImageId?.startsWith("https://")) {
        console.log(oldImageId, "@image id");
        await deleteExistImage(oldImageId);
      }
      //add new image
      if (typeof image !== "string") {
        const data = await image.arrayBuffer();
        await fs.writeFile(
          `${process.cwd()}/public/images/${imageId}.webp`,
          Buffer.from(data)
        );
      }
    } else {
      user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
        },
      });
    }

    return user;
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error patch profile -action /user");
    return { errMsg: "Error updating profile" };
  }
};

export default updateProfileAction;
