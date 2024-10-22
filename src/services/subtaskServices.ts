import { SubtaskTypes } from "@/types/subtaskTypes";
import api from "@/utils/api";
import delayTest from "@/utils/delayTest";

const subtaskServices = {
  createSubtask: async (task: SubtaskTypes) => {
    // await delayTest(3000);
    const response = await api.post("/subtask", task);
    return response.data;
  },
};

export default subtaskServices;
