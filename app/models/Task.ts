import { mongoose } from "../utils/database";
import { Activatable } from "../lib/interfaces/Activatable";
import { Property, getModelFromClass } from "../lib/decorators/model";
import ObjectId from "../lib/ObjectId";
import { BaseModel } from "../lib/classes/BaseModel";

export class TaskModel extends BaseModel implements Activatable {
    @Property({ default: true })
    _active!: boolean;

    @Property({ required: true })
    title!: string;

    @Property({})
    description?: string;

    @Property({ ref: "Task", default: null })
    parent?: ObjectId;

    @Property({})
    value?: number;

    @Property({})
    dueDate?: Date;

    @Property({ enum: ["BUG", "STORY", "IDEA", "IMPROVEMENT", "GENERIC"], default: "GENERIC" })
    type!: string;

    @Property({ ref: "User" })
    creator!: ObjectId;

    @Property({ ref: "User" })
    users!: ObjectId[];

    //Seconds
    @Property({})
    timeSpent?: number;

    @Property({ items: ObjectId, default: [] })
    tags!: ObjectId[];
}

const Task = getModelFromClass<TaskModel>(TaskModel);

export default Task;
