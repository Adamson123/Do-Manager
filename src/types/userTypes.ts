export interface UserTypes {
  name?: string;
  email: string;
  password: string;
}

export interface SubtaskCompletionHistoryTypes {
  id: string;
  userId: string | null;
  day: string;
  subtasksCompleted: string[];
}

export interface RawUserTypes {
  createdAt: string | Date;
  email: string;
  id: string;
  image: string | null;
  name: string;
  updatedAt: string | Date;
  password: string | null;
  hasPassword: boolean;
  subtaskCompletionHistory: SubtaskCompletionHistoryTypes[];
}
