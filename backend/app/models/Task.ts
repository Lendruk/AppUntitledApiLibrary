import { mongoose } from "../utils/database";
import { IActivatable } from "../lib/interfaces/IActivatable";
import { Property, getModelFromClass } from "../lib/decorators/Model";

export class TaskModel extends mongoose.Document implements IActivatable {

    @Property({ default: true })
    _active!: boolean;

    @Property({ required: true })
    title: string;

    @Property({})
    description?: string;

    constructor(title: string) {
        super();
        this.title = title;
    }
}

const Task = getModelFromClass<TaskModel>(TaskModel);

export default Task;