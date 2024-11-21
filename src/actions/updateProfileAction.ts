"use server";

import prisma from "../../prisma/client";
import { profileSchema } from "@/schemas";
import simplifyError from "@/utils/simplifyError";
import { put } from "@vercel/blob";
import * as z from "zod";

const updateProfileAction = async (formData: FormData) => {
  const profile = Object.fromEntries(formData.entries()) as z.infer<typeof profileSchema> & { imageId: string };

  const validation = profileSchema.safeParse(profile);
  if (!validation.success) {
    const errors = validation.error.format();
    return { errMsg: simplifyError(errors)[0] };
  }

  const { name, userId, image, imageId } = validation.data;
  let user;
  try {
    let blobUrl: string | undefined;

    if (image && typeof image !== "string") {
      const data = await image.arrayBuffer();
      const fileName = `profiles/${userId}.webp`;

      // Ensure imageId is a valid URL or parse its pathname
      let imageFileName: string | undefined;
      try {
        const url = new URL(imageId);
        imageFileName = url.pathname.split("/").pop(); // Get the filename from a valid URL
      } catch {
        // If imageId is not a valid URL, treat it as a path
        imageFileName = imageId.split("/").pop();
      }

      const imageUserId = imageFileName?.split("-")[0]; // Extract userId from the filename

      if (imageUserId === userId) {
        // Overwrite the existing image
        const result = await put(fileName, Buffer.from(data), {
          access: "public",
          contentType: "image/webp",
          token: process.env.BLOB_READ_WRITE_TOKEN,
          overwrite: true,
        });
        blobUrl = result.url;
      } else {
        // Create a new image
        const result = await put(fileName, Buffer.from(data), {
          access: "public",
          contentType: "image/webp",
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        blobUrl = result.url;
      }

      user = await prisma.user.update({
        where: { id: userId },
        data: {
          name,
          image: blobUrl,
        },
      });
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