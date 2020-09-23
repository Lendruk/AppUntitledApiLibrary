import { BaseModel } from "../../../MunchiJS/src/BaseModel";
import { getModelFromClass, Property } from "../../../MunchiJS/src/decorators/model";
import ObjectId from "../../../MunchiJS/src/database/mongo/ObjectId";

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
