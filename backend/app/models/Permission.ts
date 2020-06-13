import { mongoose } from "../utils/database";
import { IActivatable } from "../lib/interfaces/IActivatable";
import { Property, getModelFromClass } from "../lib/decorators/model";
import { BaseModel } from "../lib/classes/BaseModel";

export class PermissionModel extends BaseModel implements IActivatable {

    @Property({ default: true })
    _active!: boolean;

    @Property({ required: true })
    controller!: string;

    @Property({ required: true })
    endpoint!: string;

    @Property({ required: true })
    name!: string;
}

const Permission = getModelFromClass<PermissionModel>(PermissionModel);

export default Permission;