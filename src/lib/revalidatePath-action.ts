"use server";

import { revalidatePath } from "next/cache";

/**
 * THE ONLY REVALIDATE CALLABLE IN CLIENT MY COMPONENTS
 */
const Revalidate = (path: string, layout: null | "layout" | "page" = null) => {
  try {
    // Revalidate the specified path and optional layout
    if (layout) {
      revalidatePath(path, layout);
    } else {
      revalidatePath(path);
    }
    console.log(`Path revalidated: ${path}`);
  } catch (error) {
    console.error(`Failed to revalidate path: ${path}`, error);
  }
};

export default Revalidate