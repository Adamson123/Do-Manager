import { TaskTypes } from "@/types/taskTypes";
import api from "@/lib/api";
import delayTest from "@/utils/delayTest";
import { AxiosError } from "axios";

const taskServices = {
    createTask: async (task: TaskTypes) => {
        // await delayTest(3000);
        try {
            const response = await api.post("/task", task);
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            throw error.response?.data;
        }
    },
    deleteTask: async (id: string) => {
        // await delayTest(3000);
        try {
            const response = await api.delete("/task/" + id);
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            throw error.response?.data;
        }
    },
    editTask: async (task: TaskTypes, id: string) => {
        try {
            //  await delayTest(3000);
            const response = await api.patch("/task/" + id, task);
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            throw error.response?.data;
        }
    },
    getMultipleTasks: async (userId: string) => {
        try {
            // await delayTest(5000);
            const response = await api.get("/task/" + userId);
            if (typeof response.data === "string")
                throw { errMsg: "Please log in to view tasks" };
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                const error = err as AxiosError;
                throw error.response?.data;
            } else {
                const error = err as Error;
                throw error;
            }
        }
    },
};

export default taskServices;
