"use server";

import { signOut } from "../../auth";

/**
 * THE ONLY SIGNOUT CALLABLE IN CLIENT MY COMPONENTS
 *
 */
const SignOut = async () => {
    return await signOut();
};

export default SignOut;
