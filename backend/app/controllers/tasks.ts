import { Request, Response } from 'express';
import { errors } from '../utils/errors';
import { Controller } from '../lib/decorators/controller';
import { Get, Post, Put, Delete } from '../lib/decorators/verbs';
import { BaseController } from '../lib/classes/BaseController';
import Task from '../models/Task';

@Controller("/tasks")
export class TaskController extends BaseController {
    @Get("/")
    public async getTasks(req: Request, res: Response) {

        const task = new Task();
        return { good: "Boost" };
    }
}