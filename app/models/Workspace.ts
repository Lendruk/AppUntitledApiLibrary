import { Activatable } from "../lib/interfaces/Activatable";
import { Property, getModelFromClass } from "../lib/decorators/model";
import Project, { ProjectModel } from "./Project";
import Role, { RoleModel } from "./Role";
import ObjectId from "../lib/ObjectId";
import { BaseModel } from "../lib/classes/BaseModel";

export class WorkspaceUser {
    @Property({ items: Role })
    roles: RoleModel[] = [];

    @Property({ ref: "User" })
    user!: ObjectId;
}

export class WorkspaceModel extends BaseModel implements Activatable {
    @Property({ default: true })
    _active!: boolean;

    @Property({ required: true })
    name!: string;

    // Workspace level users
    @Property({ items: WorkspaceUser })
    users: WorkspaceUser[] = [];

    @Property({ items: Project })
    projects?: ProjectModel[] = [];
}

const Workspace = getModelFromClass<WorkspaceModel>(WorkspaceModel);

export default Workspace;
