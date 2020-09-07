import { Activatable } from "../../../MunchiJS/src/interfaces/Activatable";
import { Property, getModelFromClass } from "../../../MunchiJS/src/decorators/model";
import ObjectId from "../../../MunchiJS/src/database/mongo/ObjectId";
import { BaseModel } from "../../../MunchiJS/src/BaseModel";

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
