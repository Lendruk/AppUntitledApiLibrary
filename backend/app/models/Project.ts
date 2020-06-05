import { mongoose } from "../utils/database";
import { IActivatable } from "../lib/interfaces/IActivatable";
import { Property, getModelFromClass } from "../lib/decorators/Model";
import Role, { RoleModel } from "./Role";
import { ObjectId } from "../lib/ObjectId";
import Task, { TaskModel } from "./Task";

class ProjectUser {
    @Property({ items: Role })
    roles : RoleModel[] = [];

    @Property({ ref: "User" })
    user!: ObjectId;
}

export class Column {
    @Property({ required: true })
    name: string;

    @Property({ items: Task, default: [] })
    tasks: TaskModel[] = [];

    constructor(name: string) {
        this.name = name;
    }
}

export class ProjectModel extends mongoose.Document implements IActivatable {

    @Property({ default: true })
    _active!: boolean;

    @Property({ required: true })
    title!: string; 

    @Property({ items: ProjectUser })
    users: ProjectUser[] = [];

    @Property({ items: Column, default: [] })
    columns!: Column[];

}

const Project = getModelFromClass<ProjectModel>(ProjectModel);

export default Project;