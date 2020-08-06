import { BaseModel } from "../lib/classes/BaseModel";
import { getModelFromClass, Property } from "../lib/decorators/model";
import ObjectId from "../lib/ObjectId";

export class CommentModel extends BaseModel {
    @Property({ required: true })
    content!: string;

    @Property({ ref: "User", required: true })
    user!: ObjectId;

    @Property({ ref: "Task", required: true })
    task!: ObjectId;
}

const Comment = getModelFromClass<CommentModel>(CommentModel);

export default Comment;
