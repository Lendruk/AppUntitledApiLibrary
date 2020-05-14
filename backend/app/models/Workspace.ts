import { mongoose } from "../utils/database";
import { IActivatable } from "../lib/interfaces/IActivatable";
import { Property, getModelFromClass } from "../lib/decorators/Model";

export class WorkspaceModel extends mongoose.Document implements IActivatable {

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

const Workspace = getModelFromClass<WorkspaceModel>(WorkspaceModel);

export default Workspace;