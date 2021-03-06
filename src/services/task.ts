import dotenv from "dotenv";
import { TaskRepo, TaskDTO } from "@app/data/task";

dotenv.config();

class Task {
  async createTask(dto: TaskDTO, id: string) {

    return TaskRepo.create({
      description: dto.description,
      state: dto.state,
      userId: id
    });
  }
}

export const TaskService = new Task();
