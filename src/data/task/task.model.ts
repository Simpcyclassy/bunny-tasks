import { Model } from "../database";

export enum TaskState {
  Todo = "todo",
  Done = "done",
}

export interface Task extends Model {
  description: string;
  state: TaskState;
  userId: string;
}

export interface TaskDTO {
  description: string;
  state: TaskState;
  userId: string;
}
