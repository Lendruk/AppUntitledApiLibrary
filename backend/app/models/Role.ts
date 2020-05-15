import { mongoose } from "../utils/database";
import { IActivatable } from "../lib/interfaces/IActivatable";
import { Property, getModelFromClass } from "../lib/decorators/Model";
import Permission from './Permission';
import { ObjectId } from "../lib/ObjectId";

export class RoleModel extends mongoose.Document implements IActivatable {

    @Property({ default: true })
    isActive: boolean;

    @Property({ required: true })
    name: string;

    @Property({ items: Permission })
    permissions!: typeof Permission[];

    @Property({ ref: "Workspace" })
    workspace!: ObjectId;

    constructor(name: string, isActive: boolean) {
        super();
        this.name = name;
        this.isActive = isActive;
    }
}

const Role = getModelFromClass<RoleModel>(RoleModel);

export default Role;