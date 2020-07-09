import { Controller } from "../lib/decorators/controller";
import { BaseController } from "../lib/classes/BaseController";
import { Get, Post } from "../lib/decorators/verbs";
import { Request } from "../lib/types/Request";
import Workspace from "../models/Workspace";
import { errors } from "../utils/errors";
import Role from "../models/Role";
import { ObjectId } from "../lib/ObjectId";

@Controller("/workspaces")
export class WorkspaceController extends BaseController {

    @Get("/", { requireToken: true })
    public async getWorkspaces(req : Request) {
        const { user } = req;

        const workspaces = await Workspace.find({"users.user": user });

        return { workspaces };
    }

    @Post("/", { requireToken: true, body: { required: ["name"] } })
    public async postWorkspace(req: Request) {
        const { body: { name }, user } = req;

        if (Boolean(await Workspace.findOne({ "users.user": user?._id }))) {
            throw errors.BAD_REQUEST;
        }

        const ownerRole = await new Role({ name: "owner", isOwner: true });

        const workspace = await new Workspace({ name, projects: [], users: [{ user, roles: [ownerRole] }] }).save();

        // ownerRole.workspace = new ObjectId(workspace._id as string);

        ownerRole.save();

        return { status: 201, workspace };
    }
}