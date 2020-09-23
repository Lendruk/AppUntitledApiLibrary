import { Controller } from "../../../MunchiJS/src/decorators/controller";
import { BaseController } from "../../../MunchiJS/src/BaseController";
import { Get, Post } from "../../../MunchiJS/src/decorators/verbs";
import { Request } from "../../../MunchiJS/src/types/Request";
import Workspace from "../models/Workspace";
import { ErrorManager } from "../../../MunchiJS/src/ErrorManager";
import Role from "../models/Role";

@Controller("/workspaces")
export class WorkspaceController extends BaseController {
    @Get("/", { requireToken: true })
    public async getWorkspaces(req: Request): Promise<object> {
        const { user } = req;

        // Remove populate later
        const workspaces = await Workspace.find({ "users.user": user })
            .populate({
                path: "projects",
                populate: {
                    path: "columns.tasks",
                    model: "Task",
                },
            })
            .populate({ path: "users " });

        return { workspaces };
    }

    @Post("/", { requireToken: true, body: { required: ["name"] } })
    public async postWorkspace(req: Request): Promise<object> {
        const {
            body: { name },
            user,
        } = req;

        if (Boolean(await Workspace.findOne({ "users.user": user?._id }))) {
            throw ErrorManager.errors.BAD_REQUEST;
        }

        const ownerRole = await new Role({ name: "owner", isOwner: true });

        const workspace = await new Workspace({
            name,
            projects: [],
            users: [{ user: user?._id, roles: [ownerRole] }],
        }).save();
        // ownerRole.workspace = new ObjectId(workspace._id as string);
        ownerRole.save();

        return { status: 201, workspace };
    }
}
