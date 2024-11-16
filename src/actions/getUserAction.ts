"use server";
import { getUserById } from "@/data";

//! Remove this guy
export type GetUserActionTypes =
  | ReturnType<typeof getUserById>
  | { errMsg: string };

const getUserAction = async (id: string) => {
  try {
    const user = await getUserById(id);

    if (!user) {
      return { errMsg: "User does not exit" };
    }
    //console.log(user);
    return JSON.stringify(user);
  } catch (err) {
    const error = err as Error;
    console.log(error.message, "error get -action /user");
    throw { errMsg: "Error gettings user" };
  }
};

export default getUserAction;
