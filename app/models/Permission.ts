import { Activatable } from "../../../MunchiJS/src/interfaces/Activatable";
import { Property, getModelFromClass } from "../../../MunchiJS/src/decorators/model";
import { BaseModel } from "../../../MunchiJS/src/BaseModel";

export class PermissionModel extends BaseModel implements Activatable {
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
