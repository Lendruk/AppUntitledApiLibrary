import { mongoose } from "../utils/database";
import { IActivatable } from "../lib/interfaces/IActivatable";
import { Property, getModelFromClass } from "../lib/decorators/model";
import Project, { ProjectModel } from "./Project";
import Role, { RoleModel } from "./Role";
import { ObjectId } from "../lib/ObjectId";

export class WorkspaceUser {
    @Property({ items: Role })
    roles: RoleModel[] = [];

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
    projects?: ProjectModel[] = [];

    constructor(name: string, _active: boolean) {
        super();
        this.name = name;
        this._active = _active;
    }
}

const Workspace = getModelFromClass<WorkspaceModel>(WorkspaceModel);

export default Workspace;