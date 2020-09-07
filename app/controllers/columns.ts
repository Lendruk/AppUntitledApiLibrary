import { BaseController } from "../../../MunchiJS/src/BaseController";
import { Controller } from "../../../MunchiJS/src/decorators/controller";
import { Post, Delete, Put } from "../../../MunchiJS/src/decorators/verbs";
import { Column } from "../models/Project";
import { Request } from "express";
import { ErrorManager } from "../../../MunchiJS/src/ErrorManager";
import Project from "../models/Project";
import ObjectId from "../../../MunchiJS/src/database/mongo/ObjectId";

@Controller("/projects/columns")
export class ColumnController extends BaseController {
    @Post("/", {
        requireToken: true,
        body: { required: ["name", "projectId"] },
    })
    public async postColumn(req: Request): Promise<object> {
        const {
            body: { name, projectId },
        } = req;

        let project;
        try {
            project = await Project.findOneAndUpdate(
                { _id: projectId },
                { $push: { columns: new Column(name) } },
                { new: true }
            ).lean();
        } catch {
            throw ErrorManager.errors.DB_FAILED_UPDATE;
        }

        return { column: project?.columns.shift() };
    }

    @Put("/:id", {
        requireToken: true,
        body: { required: ["name", "projectId"] },
        params: { required: ["id"] },
    })
    public async putColumn(req: Request): Promise<object> {
        const {
            params: { id },
            body: { name, projectId },
        } = req;

        let project = null;
        try {
            project = await Project.findOneAndUpdate(
                { _id: projectId, "columns._id": id },
                { name },
                { new: true }
            ).lean();
        } catch {
            throw ErrorManager.errors.DB_FAILED_UPDATE;
        }

        return { columns: project?.columns };
    }

    @Delete("/:id", { requireToken: true, params: { required: ["id"] } })
    public async deleteColumn(req: Request): Promise<void> {
        const {
            params: { id },
            query: { projectId },
        } = req;

        await Project.findOneAndUpdate(
            { _id: new ObjectId(projectId as string) },
            { $pull: { "columns._id": new ObjectId(id) } }
        );
    }
}
