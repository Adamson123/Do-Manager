import { TaskTypes } from "@/types/taskTypes";
import api from "@/utils/api";
import delayTest from "@/utils/delayTest";

const taskServices = {
  createTask: async (task: TaskTypes) => {
    // await delayTest(3000);
    const response = await api.post("/task", task);
    return response.data;
  },
  deleteTask: async (id: string) => {
    // await delayTest(3000);
    const response = await api.delete("/task/" + id);
    return response.data;
  },
  editTask: async (task: TaskTypes, id: string) => {
    await delayTest(3000);
    const response = await api.patch("/task/" + id, task);
    return response.data;
  },
  getMultipleTasks: async () => {
    // await delayTest(5000);
    const response = await api.get("/task");
    return response.data;
  },
};

export default taskServices;
