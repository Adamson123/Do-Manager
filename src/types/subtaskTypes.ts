export interface RawSubtaskTypes {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  taskId: string;
  completed: boolean;
  dueDate: Date;
}

export interface SubtaskTypes {
  title: string;
  description: string;
  priority: string;
}
