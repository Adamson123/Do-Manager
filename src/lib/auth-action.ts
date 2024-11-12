"use server";
import { auth } from "../../auth";

/**
 * THE ONLY AUTH CALLABLE IN CLIENT MY COMPONENTS
 *
 */
const Auth = async () => {
  return await auth();
};

export default Auth;
