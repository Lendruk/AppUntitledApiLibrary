import { mongoose } from "../utils/database";
import { IActivatable } from "../lib/interfaces/IActivatable";
import { Property, getModelFromClass } from "../lib/decorators/Model";

export class PermissionModel extends mongoose.Document implements IActivatable {

    @Property({ default: true })
    _active: boolean;

    @Property({ required: true })
    controller: string;

    @Property({ required: true })
    endpoint: string;

    @Property({ required: true })
    name: string;


    constructor(name: string, _active: boolean, endpoint: string, controller: string) {
        super();
        this.name = name;
        this._active = _active;
        this.endpoint = endpoint;
        this.controller = controller;
    }
}

const Permission = getModelFromClass<PermissionModel>(PermissionModel);

export default Permission;