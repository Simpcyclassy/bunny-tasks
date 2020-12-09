import {
  controller,
  httpPost,
  requestBody,
  request,
  response,
  requestParam,
} from "inversify-express-utils";
import { Request, Response } from "express";
import { Task } from "@app/data/task";
import { BaseController } from "@app/data/utils";
import { secure } from "@app/data/utils"
import { TaskService } from "@app/services/task";
import { isID } from "./task.validator";
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
}
