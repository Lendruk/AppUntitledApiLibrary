import { BaseController } from "../lib/classes/BaseController";
import { Controller } from "../lib/decorators/Controller";
import { Post, Delete } from "../lib/decorators/Verbs";
import { Column } from "../models/Project";
import { Request } from "express";
import { errors } from "../utils/errors";
import Project from "../models/Project";
import { ObjectId } from "../lib/ObjectId";

@Controller("/projects/columns")
export class ColumnController extends BaseController {

    @Post("/", { requireToken: true,
         body: { required: ["name", "projectId"]},
    })
    public async postColumn(req: Request) {
        const { body: { name, projectId } } = req;

        let project;
        try {
            project = await Project.findOneAndUpdate({ _id: projectId},{ $push: { columns: new Column(name) }},{ new: true});
        } catch {
            throw errors.DB_FAILED_UPDATE;
        }

        return { column: project?.columns.shift() };
    }

    @Delete("/:id", { requireToken: true, params: { required: ["id" ]}})
    public async deleteColumn(req: Request) {
        const { params: { id }, query: { projectId } } = req;

        await Project.findOneAndUpdate({ _id: projectId }, { $pull: { "columns._id": new ObjectId(id) }});
    }
}