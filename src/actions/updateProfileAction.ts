"use server";
import fs from "fs/promises";
import fsSync from "fs";
import prisma from "../../prisma/client";
import { profileSchema } from "@/schemas";
import simplifyError from "@/utils/simplifyError";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
//import path from "path";

//path.resolve(__dirname, "../../../../public/images")
const imageDir = `${process.cwd()}/public/images`;

const createDir = async () => {
  try {
    if (!fsSync.existsSync(imageDir)) {
      await fs.mkdir(imageDir);
      console.log("Image directory created");
    }
  } catch (err) {
    const error = err as Error;
    console.log("Error creating image directory: " + error.message);
  }
};

const deleteExistImage = async (imageId: string) => {
  const existingImage = (await fs.readdir(imageDir)).find(
    (path) => path.split(".")[0] === imageId
  );

  if (existingImage) await fs.unlink(`${imageDir}/${existingImage}`);
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
      await createDir();

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
      //if there's alreading an image and the image is not starting from "https://"
      //(coming from google)
      if (oldImageId && !oldImageId?.startsWith("https://")) {
        console.log(oldImageId, "@image id");
        await deleteExistImage(oldImageId);
      }
      //add new image
      if (typeof image !== "string") {
        const data = await image.arrayBuffer();
        const dirPath = `${imageDir}/${imageId}.webp`;
        await fs.writeFile(dirPath, Buffer.from(data));
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
