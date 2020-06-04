import { Controller } from "../lib/decorators/Controller";
import { BaseController } from "../lib/classes/BaseController";
import { Get, Post } from "../lib/decorators/Verbs";
import { Request } from "../lib/types/Request";
import Workspace from "../models/Workspace";

@Controller("/workspaces")
export class WorkspaceController extends BaseController {

    @Post("/", { requireToken: true, body: { required: ["name"] } })
    public async postWorkspace(req: Request) {
        const { body: { name } } = req;

        await new Workspace({ name, projects: [] }).save();
    }
}