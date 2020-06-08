import { mongoose } from "../utils/database";
import { IActivatable } from "../lib/interfaces/IActivatable";
import { Property, getModelFromClass } from "../lib/decorators/model";
import { ObjectId } from "../lib/ObjectId";

export class TaskModel extends mongoose.Document implements IActivatable {

    @Property({ default: true })
    _active!: boolean;

    @Property({ required: true })
    title!: string;

    @Property({})
    description?: string;

    @Property({ ref: "Task" })
    parent?: ObjectId;

    @Property({})
    value?: Number;

    @Property({})
    dueDate?: Date;

    @Property({ enum: ["BUG", "STORY", "IDEA", "IMPROVEMENT", "GENERIC"], default: "GENERIC" })
    type!: string;

    //Seconds
    @Property({})
    timeSpent?: Number;

    @Property({ items: ObjectId })
    tags!: ObjectId[];
}

const Task = getModelFromClass<TaskModel>(TaskModel);

export default Task;