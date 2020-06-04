import { mongoose } from "../utils/database";
import { IActivatable } from "../lib/interfaces/IActivatable";
import { Property, getModelFromClass } from "../lib/decorators/Model";
import User from "./User";
import Project from "./Project";
import Role from "./Role";
import { ObjectId } from "../lib/ObjectId";

class WorkspaceUser {
    @Property({ items: Role })
    roles : typeof Role[] = [];

    @Property({ ref: "User" })
    user!: ObjectId;
}

export class WorkspaceModel extends mongoose.Document implements IActivatable {

    @Property({ default: true })
    _active: boolean;

    @Property({ required: true })
    name: string;

    // Workspace level users
    @Property({ items: WorkspaceUser })
    users: WorkspaceUser[] = [];

    @Property({ items: Project })
    projects!: typeof Project[];

    constructor(name: string, _active: boolean) {
        super();
        this.name = name;
        this._active = _active;
    }
}

const Workspace = getModelFromClass<WorkspaceModel>(WorkspaceModel);

export default Workspace;