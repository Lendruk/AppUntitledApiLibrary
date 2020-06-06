import { BaseController } from "../lib/classes/BaseController";
import { Controller } from "../lib/decorators/Controller";
import { Get, Post, Delete } from "../lib/decorators/Verbs";
import { Request } from "../lib/types/Request";
import Project from "../models/Project";
import Workspace from "../models/Workspace";
import { ObjectId } from "../lib/ObjectId";
import { errors } from "../utils/errors";

@Controller("/projects")
export class ProjectController extends BaseController {

    @Get("/", { requireToken: true, headers: { required: ["workspace"] } })
    public async getProjects(req: Request) {
        const { headers: { workspace } } = req;

        //Add verification to check if user belongs to provided workspace
        const projects = await Workspace.aggregate([
            { $match: { _id: new ObjectId(workspace as string) } },
            {
                $lookup: {
                    from: "projects",
                    localField: "projects",
                    foreignField: "_id",
                    as: "projects",
                },
            },
        ]);

        return { projects };
    }

    @Get("/:id", { requireToken: true, params: { required: ["id"] } })
    public async getProject(req: Request) {
        const { params: { id } } = req;

        let project = null;
        try {
            project = await Project.findOne({ _id: id }).lean();
        } catch (err) {
            throw errors.NOT_FOUND;
        }

        return { project };
    }

    @Post("/", { requireToken: true,
        headers: { required: ["workspace"]},
        body: { required: ["title"] }
    })
    public async postProject(req: Request) {
        const { headers: { workspace }, body: { title } } = req;

        const project = await new Project({ title }).save();

        await Workspace.findOneAndUpdate({ _id: new ObjectId(workspace as string) }, { $push: { projects: project } });

        return { code: 201, project };
    }

    @Delete("/:id", { requireToken: true, headers: { required: ["workspace"] } })
    public async deleteProject(req: Request) {
        const { headers: { workspace }, params: { id }, user } = req;

        const workspaceObj = await Workspace.aggregate([
            { $match: { projects: new ObjectId(id) } },
            {
                $lookup: {
                    from: "roles",
                    localField: "users.role",
                    foreignField: "_id",
                    as: "users.role",
                },
            },
            { $match: { $and: [ { "users.user": user?._id }, { "users.role.isOwner": true }]}}
        ]);

        if(!workspaceObj) throw errors.NO_PERMISSION;

        try {
            await Project.findOneAndDelete({ _id: new ObjectId(id) });
        } catch(err) {
            throw errors.BAD_REQUEST;
        }
    }
}