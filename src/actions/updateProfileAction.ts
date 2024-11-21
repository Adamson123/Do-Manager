"use server";

import prisma from "../../prisma/client";
import { profileSchema } from "@/schemas";
import simplifyError from "@/utils/simplifyError";
import { put } from "@vercel/blob";
import * as z from "zod";

const updateProfileAction = async (formData: FormData) => {
  const profile = Object.fromEntries(formData.entries()) as z.infer<typeof profileSchema>;

  const validation = profileSchema.safeParse(profile);
  if (!validation.success) {
    const errors = validation.error.format();
    return { errMsg: simplifyError(errors)[0] };
  }

  const { name, userId, image } = validation.data;

  try {
    if (image && typeof image !== "string") {
      const data = await image.arrayBuffer();
      const blobUrl = await put(
        `profiles/${userId}.webp`,
        Buffer.from(data),
        {
          access: "public",
          contentType: "image/webp",
          token: process.env.BLOB_READ_WRITE_TOKEN,
        }
      );

      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          name,
          image: blobUrl.url,
        },
      });

      return user;
    } else {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { name },
      });

      return user;
    }
  } catch (err) {
    console.error("Error updating profile:", (err as Error).message);
    return { errMsg: "Error updating profile" };
  }
};

export default updateProfileAction;
