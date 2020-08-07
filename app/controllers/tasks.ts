import { ErrorManager } from "../utils/ErrorManager";
import { Controller } from "../lib/decorators/controller";
import { Get, Post, Put, Delete, Patch } from "../lib/decorators/verbs";
import { BaseController } from "../lib/classes/BaseController";
import Task from "../models/Task";
import Project from "../models/Project";
import mongoose from "mongoose";
import Comment from "../models/Comment";
import { Request } from "../lib/types/Request";
import ObjectId from "../lib/ObjectId";
import { SocketEvent, SocketServer } from "../lib/classes/SocketServer";
import { Server, Socket } from "socket.io";
import { Inject } from "../lib/decorators/Inject";

@Controller("/tasks")
export class TaskController extends BaseController {
    @Inject()
    private _socketServer!: SocketServer;

    @Get("/", {
        requireToken: true,
        headers: {
            required: ["workspace"],
        },
    })
    public async getTasks(req: Request) {
        let tasks = null;
        try {
            tasks = await Task.find().lean();
        } catch (err) {
            throw ErrorManager.errors.NOT_FOUND;
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
            task = await Task.findOne({ _id: id }, "-__v -_created -_modified").lean();
        } catch (err) {
            throw ErrorManager.errors.NOT_FOUND;
        }
        return { task };
    }

    @Get("/project/:projectId", {
        requireToken: true,
        params: { required: ["projectId"] },
        body: { required: ["columnId"] },
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
                    },
                },
                {
                    $project: {
                        "columns.tasks.__v": 0,
                        "columns.tasks._created": 0,
                        "columns.tasks._modified": 0,
                    },
                },
            ]);
        } catch (err) {
            throw ErrorManager.errors.NOT_FOUND;
        }
        return { tasks: tasks[0].columns.tasks };
    }

    @Patch("/project/:projectId/:taskId")
    public async moveTask(req: Request) {
        const {
            params: { projectId, taskId },
            body: { newColumnId, oldColumnId },
        } = req;

        try {
            await Project.findOneAndUpdate(
                {
                    _id: projectId,
                    columns: { $elemMatch: { _id: oldColumnId } },
                },
                {
                    $pull: { "columns.$.tasks": taskId },
                },
                { new: true }
            );

            await Project.findOneAndUpdate(
                {
                    _id: projectId,
                    columns: { $elemMatch: { _id: newColumnId } },
                },
                {
                    $push: { "columns.$.tasks": taskId },
                }
            );
        } catch (err) {
            console.log(err);
            throw ErrorManager.errors.BAD_REQUEST;
        }
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
                    columns: { $elemMatch: { _id: columnId } },
                },
                {
                    $push: { "columns.$.tasks": task._id },
                },
                {
                    new: true,
                }
            ).lean();
        } catch (err) {
            console.log(err);
            throw ErrorManager.errors.BAD_REQUEST;
        }

        return { task };
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
            throw ErrorManager.errors.NOT_FOUND;
        }
        return { task: updatedTask };
    }

    @Delete("/project/:projectId/:columnId/:taskId", {
        requireToken: true,
        params: { required: ["projectId"] },
    })
    public async deleteTasks(req: Request) {
        const {
            params: { projectId, columnId, taskId },
        } = req;

        try {
            await Task.findOneAndDelete({ _id: taskId });

            await Project.findOneAndUpdate(
                {
                    _id: projectId,
                    columns: { $elemMatch: { _id: columnId } },
                },
                {
                    $pull: { "columns.$.tasks": taskId },
                },
                {
                    new: true,
                }
            ).lean();
        } catch (err) {
            throw ErrorManager.errors.BAD_REQUEST;
        }
    }

    @Get("/:id/comments")
    public async getComments(req: Request) {
        const {
            params: { id },
        } = req;

        const comments = await Comment.find({ task: new ObjectId(id) });

        return { comments };
    }

    @Post("/:id/comments", { body: { required: ["content"] } })
    public async createComment(req: Request) {
        const {
            body: { content },
            user,
            params: { id },
        } = req;

        const comment = await new Comment({ user: user, content, task: id }).save();

        return { status: 201, comment };
    }

    @Delete("/:taskId/comments/:commentId")
    public async deleteComment(req: Request) {
        const {
            params: { taskId, commentId },
        } = req;

        await Comment.findOneAndDelete({ _id: commentId, task: new ObjectId(taskId) });
    }

    @SocketEvent("broadcast_task")
    public async broadcastTask(socketServer: Server, socket: Socket, data?: any) {
        socket.emit("test", { test: true });
        console.log("test broadcast");
    }
}
