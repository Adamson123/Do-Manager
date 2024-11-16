import { RawSubtaskTypes } from "./subtaskTypes";

export interface TaskTypes {
    title: string;
    description: string;
    priority: string;
    userId?: string;
}

export interface RawTaskTypes {
    id: string;
    userId: string;
    title: string;
    description: string;
    priority: string;
    createdAt: Date;
    updatedAt: Date;
    subtasks: RawSubtaskTypes[]; //will be an array of raw subtasks(subtasks coming directly from the database)
}
