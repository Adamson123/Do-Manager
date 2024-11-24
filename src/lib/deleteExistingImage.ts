import { del } from "@vercel/blob";

export const deleteExistingImage = async (imageId: string) => {
  if (!imageId || imageId === "null") return;

  const imageUrlClass = new URL(imageId);
  if (
    imageUrlClass.hostname === "nwtdicgwbtncdg8c.public.blob.vercel-storage.com"
  ) {
    try {
      const abortImageDeletion = new AbortController();
      const deleteTimeoutId = setTimeout(() => {
        abortImageDeletion.abort();
      }, 13500);
      // delete the existing image
      await del(imageId, { abortSignal: abortImageDeletion.signal });
      clearTimeout(deleteTimeoutId);
      console.log("Existing image deleted");
    } catch (err) {
      console.error("Error: Existing Image delete timeout");
    }
  }
};

export default deleteExistingImage;
