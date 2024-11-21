"use server";

import fsSync from "fs";
import prisma from "../../prisma/client";
import { profileSchema } from "@/schemas";
import simplifyError from "@/utils/simplifyError";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import { put } from "@vercel/blob";

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
      //// const imageId = uuidv4();
      // Upload new image to Vercel Blob
      if (typeof image !== "string") {
        const data = await image.arrayBuffer();
        const blobUrl = await put(
          `profiles/${userId}.webp`,
          Buffer.from(data),
          {
            access: "public",
            contentType: "image/webp",
            token: process.env.BLOB_READ_WRITE_TOKEN,
          },
        );

        user = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            name,
            image: blobUrl.url,
          },
        });
        console.log("Image uploaded to Vercel Blob:", blobUrl);
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
