import {
  controller,
  httpPost,
  requestBody,
  request,
  response,
  httpGet,
  requestParam,
  httpDelete,
  httpPatch
} from "inversify-express-utils";
import { Request, Response } from "express";
import { Task, TaskDTO } from "@app/data/task";
import { BaseController } from "@app/data/utils";
import { TaskRepo } from "@app/data/task";
import { secure } from "@app/data/utils"
import { TaskService } from "@app/services/task";
import { isID } from "./task.validator";
import { TaskState } from "@app/data/task"
import { isTask } from "./task.validator";

type ControllerResponse = Task | Task[] | string;

@controller("/tasks")
export class UserTaskController extends BaseController<ControllerResponse> {
  @httpPost("/:id", secure(isID), secure(isTask))
  async createTaskbyUser(
    @request() req: Request,
    @response() res: Response,
    @requestParam("id") id: string,
    @requestBody() body: Task
  ) {
    const task = await TaskService.createTask(body, id);

    this.handleSuccess(req, res, task);
  }

  @httpGet("/:id/all")
  async getAllTasksbyUserId(
    @request() req: Request,
    @response() res: Response,
    @requestParam("id") id: string,
  ) {
    const user = await TaskRepo.all({
      conditions: {
        userId: { $eq: id }
      },
    });
    this.handleSuccess(req, res, user);
  }

  @httpPatch("/:id", secure(isID), secure(isTask))
  async updateTask(
    @request() req: Request,
    @response() res: Response,
    @requestParam("id") id: string,
    @requestBody() body: TaskDTO
  ) {
    const update: any = { description: body.description };

    const updatedTask = await TaskRepo.atomicUpdate(id, update);
    this.handleSuccess(req, res, updatedTask);
  }

  @httpPatch("/:id/done", secure(isID))
  async markTaskAsDone(
    @request() req: Request,
    @response() res: Response,
    @requestParam("id") id: string
  ) {

    const update: any = { state: TaskState.Done };

    const isTaskDone = await TaskRepo.atomicUpdate(id, update);
    this.handleSuccess(req, res, isTaskDone);
  }

  @httpDelete("/:id", secure(isID))
  async deleteTask(
    @request() req: Request,
    @response() res: Response,
    @requestParam("id") id: string
  ) {

    const deletedTask = await TaskRepo.destroy(id);

    this.handleSuccess(req, res, deletedTask);
  }

}
