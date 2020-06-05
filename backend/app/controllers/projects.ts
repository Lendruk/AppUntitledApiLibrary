import { BaseController } from "../lib/classes/BaseController";
import { Controller } from "../lib/decorators/Controller";
import { Get, Post } from "../lib/decorators/Verbs";
import { Request } from "../lib/types/Request";
import Project from "../models/Project";
import Workspace from "../models/Workspace";
import { ObjectId } from "../lib/ObjectId";

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
}