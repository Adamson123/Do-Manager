import api from "@/lib/api";
import { UserTypes } from "@/types/userTypes";
import delayTest from "@/utils/delayTest";
import { AxiosError } from "axios";

const userServices = {
  signup: async (user: UserTypes) => {
    // await delayTest(3000);
    try {
      const response = await api.post("/signup", user);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      throw error.response?.data;
    }
  },
  signin: async (user: UserTypes) => {
    // await delayTest(3000);
    try {
      const response = await api.post("/signin", user);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      throw error.response?.data;
    }
  },
};

export default userServices;
