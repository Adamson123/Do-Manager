"use server";

import deleteExistingImage from "@/lib/deleteExistingImage";
import prisma from "../../prisma/client";
import { profileSchema } from "@/schemas";
import simplifyError from "@/utils/simplifyError";
import { put } from "@vercel/blob";
import * as z from "zod";

const updateProfileAction = async (formData: FormData) => {
  const profile = Object.fromEntries(formData.entries()) as z.infer<
    typeof profileSchema
  > & { imageId: string };

  const validation = profileSchema.safeParse(profile);
  if (!validation.success) {
    const errors = validation.error.format();
    return { errMsg: simplifyError(errors)[0] };
  }

  const { name, userId, image } = validation.data;
  const imageId = profile.imageId;
  let user;
  try {
    if (image && typeof image !== "string") {
      const data = await image.arrayBuffer();
      const fileName = `profiles/${userId}`;

      const abortImageUpload = new AbortController();
      const uploadTimeoutId = setTimeout(() => {
        abortImageUpload.abort();
      }, 24000);
      // Create a new image
      const blobUrl = await put(fileName, Buffer.from(data), {
        access: "public",
        contentType: "image/webp",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        abortSignal: abortImageUpload.signal,
      });
      clearTimeout(uploadTimeoutId);

      user = await prisma.user.update({
        where: { id: userId },
        data: {
          name,
          image: blobUrl.url,
        },
      });
    
      await deleteExistingImage(imageId);
    } else {
      // If no new image is provided, just update the name
      user = await prisma.user.update({
        where: { id: userId },
        data: { name },
      });
    }
    return user;
  } catch (err) {
    console.error("Error updating profile:", (err as Error).message);
    return { errMsg: "Error updating profile" };
  }
};

export default updateProfileAction;
