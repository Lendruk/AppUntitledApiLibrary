import { mongoose } from "../utils/database";
import { IActivatable } from "../lib/interfaces/IActivatable";
import { Property, getModelFromClass } from "../lib/decorators/Model";
import Permission from './Permission';
import Workspace from "./Workspace";

export class RoleModel extends mongoose.Document implements IActivatable {

    @Property({ default: true })
    isActive: boolean;

    @Property({ required: true })
    name: string;

    @Property({ ref: "Permission" })
    permissions!: typeof Permission[];

    @Property({ ref: "Workspace" })
    workspace?: typeof Workspace;

    constructor(name: string, isActive: boolean) {
        super();
        this.name = name;
        this.isActive = isActive;
    }
}

const Role = getModelFromClass<RoleModel>(RoleModel);

export default Role;