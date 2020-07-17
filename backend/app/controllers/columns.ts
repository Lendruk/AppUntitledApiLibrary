import { BaseController } from "../lib/classes/BaseController";
import { Controller } from "../lib/decorators/controller";
import { Post, Delete, Put } from "../lib/decorators/verbs";
import { Column } from "../models/Project";
import { Request } from "express";
import { errors } from "../utils/errors";
import Project from "../models/Project";
import { ObjectId } from "../lib/ObjectId";

@Controller("/projects/columns")
export class ColumnController extends BaseController {

    @Post("/", {
        requireToken: true,
        body: { required: ["name", "projectId"] },
    })
    public async postColumn(req: Request) {
        const { body: { name, projectId } } = req;

        let project;
        try {
            project = await Project.findOneAndUpdate({ _id: projectId }, { $push: { columns: new Column(name) } }, { new: true }).lean();
        } catch {
            throw errors.DB_FAILED_UPDATE;
        }

        return { column: project?.columns.shift() };
    }

    @Put("/:id", {
        requireToken: true,
        body: { required: ["name", "projectId"] },
        params: { required: ["id"] }
    })
    public async putColumn(req: Request) {
        const { params: { id }, body: { name, projectId } } = req;

        let project = null;
        try {
            project = await Project.findOneAndUpdate({ _id: projectId, "columns._id": id}, { name }, { new: true }).lean();
        } catch {
            throw errors.DB_FAILED_UPDATE;
        }

        return { columns: project?.columns };
    }

    @Delete("/:id", { requireToken: true, params: { required: ["id"] } })
    public async deleteColumn(req: Request) {
        const { params: { id }, query: { projectId } } = req;

        await Project.findOneAndUpdate({ _id: projectId as string }, { $pull: { "columns._id": new ObjectId(id) } });
    }
}