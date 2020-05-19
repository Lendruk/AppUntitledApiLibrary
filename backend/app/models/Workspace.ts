import { mongoose } from "../utils/database";
import { IActivatable } from "../lib/interfaces/IActivatable";
import { Property, getModelFromClass } from "../lib/decorators/Model";

export class WorkspaceModel extends mongoose.Document implements IActivatable {

    @Property({ default: true })
    _active: boolean;

    @Property({ required: true })
    name: string;

    constructor(name: string, _active: boolean) {
        super();
        this.name = name;
        this._active = _active;
    }
}

const Workspace = getModelFromClass<WorkspaceModel>(WorkspaceModel);

export default Workspace;