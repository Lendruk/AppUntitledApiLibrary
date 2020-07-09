import { BaseController } from "../lib/classes/BaseController";
import { Controller } from "../lib/decorators/controller";
import { Get, Post, Put, Delete } from "../lib/decorators/verbs";
import { Request } from "../lib/types/Request";
import Project, { Tag, ProjectModel } from "../models/Project";
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
            project = await Project.findOne({ _id: id }).populate("columns.tasks").lean();
            // project = await Project.aggregate([
            // { $match: { _id: id as ObjectId } },
            // {
            //     $lookup: {
            //         from: "tasks",
            //         localField: "columns.tasks",
            //         foreignField: "_id",
            //         as: "columns.tasks",
            //     },
            // }
        // ]);
        } catch (err) {
            throw errors.NOT_FOUND;
        }

        return { project };
    }

    @Get("/:id/tags", { requireToken: true, params: { required: ["id"] } })
    public async getProjectTags(req: Request) {
        const { params: { id } } = req;

        let tags = null;
        try {
            tags = await Project.findOne({ _id: id }, '-_id tags').lean();
        } catch (err) {
            throw errors.NOT_FOUND;
        }
        return { tags: tags?.tags };
    }

    @Post("/:id/tags", {
        requireToken: true,
        params: { required: ["id"] }
    })
    public async postProjectTags(req: Request) {
        const {
            params: { id },
            body: { name, colour }
        } = req;

        let updatedWorkSpace = await Project.findOneAndUpdate(
            { _id: id },
            {
                $push: { "tags": new Tag(name, colour) }
            },
            {
                new: true
            });

        return { status: 201, tags: updatedWorkSpace?.tags };
    }

    @Post("/", {
        requireToken: true,
        headers: { required: ["workspace"] },
        body: { required: ["title"] }
    })
    public async postProject(req: Request) {
        const { headers: { workspace }, body: { title } } = req;

        const project = await new Project({ title }).save();

        await Workspace.findOneAndUpdate({ _id: workspace as string }, { $push: { projects: project } });

        return { status: 201, project };
    }

    @Put("/:id/tags", {
        requireToken: true,
        params: { required: ["id"] }
    })
    public async putProjectTags(req: Request) {
        const {
            params: { id },
            body: { tagId }
        } = req;

        let query: { [index: string]: any } = {};
        for (const key in req.body) {
            query[`tags.$.${key}`] = req.body[key]
        }

        let updatedWorkSpace = await Project.findOneAndUpdate(
            {
                _id: id,
                tags: { $elemMatch: { _id: tagId } }
            },
            {
                $set: { ...query }
            },
            {
                new: true,
            });

        if (!updatedWorkSpace) throw errors.NOT_FOUND;

        return { status: 201, tags: updatedWorkSpace?.tags };
    }

    @Delete("/:id/tags", {
        requireToken: true,
        params: { required: ["id"] }
    })
    public async postdeleteTag(req: Request) {
        const {
            params: { id },
            body: { tagId }
        } = req;

        let updatedWorkSpace = await Project.findOneAndUpdate(
            { _id: id },
            {
                $pull: { "tags": { _id: tagId } }
            },
            {
                new: true
            });

        return { status: 201, tags: updatedWorkSpace?.tags };
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
            { $match: { $and: [{ "users.user": user?._id }, { "users.role.isOwner": true }] } }
        ]);

        if (!workspaceObj) throw errors.NO_PERMISSION;

        try {
            await Project.findOneAndDelete({ _id: id });
        } catch (err) {
            throw errors.BAD_REQUEST;
        }
    }
}