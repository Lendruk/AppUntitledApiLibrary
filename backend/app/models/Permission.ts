import { mongoose } from "../utils/database";
import { IActivatable } from "../lib/interfaces/IActivatable";
import { Property, getModelFromClass } from "../lib/decorators/Model";

class PermissionModel extends mongoose.Document implements IActivatable {

    @Property({ default: true })
    isActive: boolean;

    @Property({ required: true })
    name: string;


    constructor(name: string, isActive: boolean) {
        super();
        this.name = name;
        this.isActive = isActive;
    }
}

const Permission = getModelFromClass<PermissionModel>(PermissionModel);

export default Permission;