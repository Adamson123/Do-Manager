import api from "@/lib/api";
import delayTest from "@/utils/delayTest";
import { AxiosError } from "axios";

const userServices = {
  getUser: async (id: string) => {
    // await delayTest(3000);
    try {
      const response = await api.get("/user/" + id);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      throw error.response?.data;
    }
  },
};

export default userServices;
