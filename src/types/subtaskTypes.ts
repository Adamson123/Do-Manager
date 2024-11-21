export interface RawSubtaskTypes {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  taskId: string;
  completed: boolean;
  //dateCompleted: string;
  favorite: boolean;
  dueDate: string;
  priority?: string;
}

export interface SubtaskTypes {
  title: string;
  description?: string;
  dueDate: string;
  taskId: string;
  userId: string;
}

type sideUpdate = "completion" | "favorite";

export interface EditableSubtaskFieldTypes {
  title: string;
  description?: string;
  dueDate: string;
  taskId: string;
  completed?: boolean;
  dateCompleted?: string;
  favorite?: boolean;
  sideUpdate?: sideUpdate;
}
