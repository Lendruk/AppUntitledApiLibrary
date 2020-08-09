import { BaseController } from "../lib/classes/BaseController";
import { Controller } from "../lib/decorators/controller";
import { Get, Post, Delete } from "../lib/decorators/verbs";
import { Request } from "../lib/types/Request";
import Invite from "../models/Invite";
import { ErrorManager } from "../lib/classes/ErrorManager";
import Project from "../models/Project";
import Workspace from "../models/Workspace";
import ObjectId from "../lib/ObjectId";

@Controller("/invites")
export class InviteController extends BaseController {
    // entityMap: Map<string, mongoose.Model<any>>;
    entityMap: Map<string, any>;

    constructor() {
        super();
        this.entityMap = new Map();

        this.entityMap.set("project", Project);
        this.entityMap.set("workspace", Workspace);
    }

    @Get("/", { requireToken: true })
    public async getInvites(req: Request) {
        const { user } = req;

        const invites = await Invite.find({ invitee: user });

        return { invites };
    }

    @Post("/", { requireToken: true, body: { required: ["invitee", "entityId", "entityType", "role"] } })
    public async postInvite(req: Request) {
        const {
            user,
            body: { invitee, entityId, entityType, role },
        } = req;

        const invite = await new Invite({ inviter: user, invitee, entityId, entityType, role }).save();

        //TODO: Send Email

        return { status: 201, invite };
    }

    @Post("/:id", { requireToken: true, params: { required: ["id"] } })
    public async acceptInvite(req: Request) {
        const {
            params: { id },
            user,
        } = req;

        const invite = await Invite.findOne({ _id: id, invitee: user }).lean();

        if (!invite) throw ErrorManager.errors.NOT_FOUND;

        const entity = this.entityMap.get(invite.entityType);

        await entity?.findOneAndUpdate(
            { _id: new ObjectId(invite.entityId) },
            { $push: { users: { user: user, role: invite.role } } },
            { new: true }
        );
    }

    @Delete("/:id", { params: { required: ["id"] } })
    public async deleteInvite(req: Request) {
        const {
            params: { id },
        } = req;

        await Invite.findOneAndDelete({ _id: id });
    }
}
