import { Controller } from "../lib/decorators/controller";
import { BaseController } from "../lib/classes/BaseController";
import { Get, Post } from "../lib/decorators/verbs";
import { Request } from "../lib/types/Request";
import Workspace from "../models/Workspace";
import { errors } from "../utils/errors";
import Role from "../models/Role";

@Controller("/workspaces")
export class WorkspaceController extends BaseController {

    @Post("/", { requireToken: true, body: { required: ["name"] } })
    public async postWorkspace(req: Request) {
        const { body: { name }, user } = req;

        if (Boolean(await Workspace.findOne({ "users.user": user?._id }))) {
            throw errors.BAD_REQUEST;
        }

        const ownerRole = await new Role({ name: "owner", isOwner: true });

        const workspace = await new Workspace({ name, projects: [], users: [{ user, roles: [ownerRole] }] }).save();

        ownerRole.workspace = workspace._id;

        ownerRole.save();

        return { code: 201, workspace };
    }
}