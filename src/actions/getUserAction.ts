"use server";
import { getUserById } from "@/data";

const getUserAction = async (id: string) => {
  try {
    const user = await getUserById(id);
    if (!user) {
      return { errMsg: "User does not exit" };
    }
    //console.log(user);
    const hasPassword = Boolean(user.password);
    user.password = "";
    return JSON.stringify({ ...user, hasPassword });
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error get -action /user");
    return { errMsg: "Error getting user" };
  }
};

export default getUserAction;
