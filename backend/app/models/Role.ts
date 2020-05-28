import { mongoose } from "../utils/database";
import { IActivatable } from "../lib/interfaces/IActivatable";
import { Property, getModelFromClass } from "../lib/decorators/Model";
import Permission from './Permission';
import { ObjectId } from "../lib/ObjectId";

export class RoleModel extends mongoose.Document implements IActivatable {

    @Property({ default: true })
    _active: boolean;

    @Property({ required: true })
    name: string;

    @Property({ items: Permission })
    permissions!: typeof Permission[];

    @Property({ ref: "Workspace" })
    workspace!: ObjectId;

    @Property({ default: false })
    global!: boolean;

    constructor(name: string, _active: boolean) {
        super();
        this.name = name;
        this._active = _active;
    }
}

const Role = getModelFromClass<RoleModel>(RoleModel);

export default Role;