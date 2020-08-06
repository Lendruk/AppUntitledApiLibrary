import { mongoose } from "../utils/database";
import { IActivatable } from "../lib/interfaces/IActivatable";
import { Property, getModelFromClass } from "../lib/decorators/model";
import Permission, { PermissionModel } from './Permission';
import ObjectId from "../lib/ObjectId";
import { BaseModel } from "../lib/classes/BaseModel";

export class RoleModel extends BaseModel implements IActivatable {

    @Property({ default: true })
    _active: boolean;

    @Property({ required: true })
    name: string;

    @Property({ items: Permission })
    permissions!: PermissionModel[];

    @Property({ default: false })
    isOwner!: boolean;

    @Property({ ref: "Workspace" })
    workspace!: ObjectId;

    @Property({ default: false })
    global!: boolean;

    constructor(name: string, _active: boolean) {
        super();
        this.name = name;
        this._active = _active;
    }

    hasPermission(permission: PermissionModel): boolean {

        this.permissions.find(perm =>
            perm.controller === permission.controller &&
            perm.endpoint === permission.endpoint &&
            perm._active
        );

        return false;
    }
}

const Role = getModelFromClass<RoleModel>(RoleModel);

export default Role;