import { EditableSubtaskFieldTypes, SubtaskTypes } from "@/types/subtaskTypes";
import api from "@/lib/api";
import delayTest from "@/utils/delayTest";
import { AxiosError } from "axios";

const subtaskServices = {
  createSubtask: async (subtask: SubtaskTypes) => {
    // await delayTest(3000);
    try {
      const response = await api.post("/subtask", subtask);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      throw error.response?.data;
    }
  },
  editSubtask: async (subtask: EditableSubtaskFieldTypes, id: string) => {
    try {
    
      const response = await api.patch("/subtask/" + id, subtask);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      throw error.response?.data;
    }
  },
  deleteSubtask: async (id: string) => {
    try {
      //  await delayTest(3000);
      const response = await api.delete("/subtask/" + id);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      throw error.response?.data;
    }
  },
};

export default subtaskServices;
