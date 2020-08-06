import { mongoose } from "../utils/database";
import { Activatable } from "../lib/interfaces/Activatable";
import { Property, getModelFromClass, ModelOptions } from "../lib/decorators/model";
import Role, { RoleModel } from "./Role";
import ObjectId from "../lib/ObjectId";
import Task, { TaskModel } from "./Task";
import { BaseModel } from "../lib/classes/BaseModel";

class ProjectUser {
    @Property({ items: Role })
    roles: RoleModel[] = [];

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

export class Tag {
    _id!: string;

    @Property({ required: true })
    name!: string;

    @Property({ required: true })
    colour!: string;

    constructor(name: string, colour: string) {
        this.name = name;
        this.colour = colour;
    }
}

export class ProjectModel extends BaseModel implements Activatable {
    @Property({ default: true })
    _active!: boolean;

    @Property({ required: true })
    title!: string;

    @Property({ items: ProjectUser })
    users: ProjectUser[] = [];

    @Property({ items: Column, default: [] })
    columns!: Column[];

    @Property({ items: Tag, default: [] })
    tags!: Tag[];
}

const Project = getModelFromClass<ProjectModel>(ProjectModel);

export default Project;
