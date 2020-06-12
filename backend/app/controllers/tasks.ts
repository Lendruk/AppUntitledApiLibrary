import { Request, Response } from 'express';
import { errors } from '../utils/errors';
import { Controller } from '../lib/decorators/controller';
import { Get, Post, Put, Delete } from '../lib/decorators/verbs';
import { BaseController } from '../lib/classes/BaseController';
import Task from '../models/Task';
import Project from '../models/Project';
import mongoose from 'mongoose';

@Controller("/tasks")
export class TaskController extends BaseController {

    @Get("/", {
        requireToken: true,
        headers: {
            required: ["workspace"]
        }
    })
    public async getTasks(req: Request) {
        let tasks = null;
        try {
            tasks = await Task.find().lean();
        } catch (err) {
            throw errors.NOT_FOUND;
        }
        return { tasks };
    }

    @Get("/:id", {
        requireToken: true,
        params: { required: ["id"] },
    })
    public async getTaskById(req: Request) {
        const {
            params: { id },
        } = req;

        let task = null;
        try {
            task = await Task.findOne({ _id: id }, '-__v -_created -_modified').lean();
        } catch (err) {
            throw errors.NOT_FOUND;
        }
        return { task };
    }

    @Get("/project/:projectId", {
        requireToken: true,
        params: { required: ["projectId"] },
        body: { required: ["columnId"] }
    })
    public async getTasksFromColumn(req: Request) {
        const {
            params: { projectId },
            body: { columnId },
        } = req;

        let tasks = null;
        try {
            tasks = await Project.aggregate([
                { $match: { _id: mongoose.Types.ObjectId(projectId) } },
                { $project: { columns: 1, _id: 0 } },
                { $unwind: "$columns" },
                { $match: { "columns._id": mongoose.Types.ObjectId(columnId) } },
                {
                    $lookup: {
                        from: "tasks",
                        localField: "columns.tasks",
                        foreignField: "_id",
                        as: "columns.tasks",
                    }
                },
                {
                    $project: {
                        "columns.tasks.__v": 0,
                        "columns.tasks._created": 0,
                        "columns.tasks._modified": 0
                    }
                },
            ])
        } catch (err) {
            throw errors.NOT_FOUND;
        }
        return { tasks: tasks[0].columns.tasks };
    }

    @Post("/project/:projectId", {
        requireToken: true,
        params: { required: ["projectId"] },
    })
    public async postTasks(req: Request) {
        const {
            params: { projectId },
            body: { columnId },
        } = req;

        let task = null;
        try {
            task = await new Task(req.body).save();

            await Project.findOneAndUpdate(
                {
                    _id: projectId,
                    columns: { $elemMatch: { _id: columnId } }
                },
                {
                    $push: { "columns.$.tasks": task._id }
                },
                {
                    new: true
                }
            ).lean();
        } catch (err) {
            throw errors.BAD_REQUEST;
        }

        return { task }
    }

    @Put("/:id", {
        requireToken: true,
        params: { required: ["id"] },
    })
    public async putTasks(req: Request) {
        const {
            params: { id },
            body,
        } = req;

        let updatedTask = null;
        try {
            updatedTask = await Task.findOneAndUpdate({ _id: id }, body, { new: true }).lean();
        } catch (err) {
            throw errors.NOT_FOUND;
        }
        return { task: updatedTask };
    }

    @Delete("/project/:projectId", {
        requireToken: true,
        params: { required: ["projectId"] },
    })
    public async deleteTasks(req: Request) {
        const {
            params: { projectId },
            body: { columnId, taskId },
        } = req;

        try {
            await Task.findOneAndDelete({ _id: taskId });

            await Project.findOneAndUpdate(
                {
                    _id: projectId,
                    columns: { $elemMatch: { _id: columnId } }
                },
                {
                    $pull: { "columns.$.tasks": taskId }
                },
                {
                    new: true
                }
            ).lean();
        } catch (err) {
            throw errors.BAD_REQUEST;
        }
    }

    //Test file upload
    //TODO investigate file extension being removed
    @Post("/file", {
        uploadFiles: true,
        requireToken: true
    })
    public async uploadFile(req: Request, res: Response) {
        console.log(req.files);
    }
}