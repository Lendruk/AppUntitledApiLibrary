import ObjectId from "../../../MunchiJS/src/database/mongo/ObjectId";
import { Property, getModelFromClass } from "../../../MunchiJS/src/decorators/model";
import { BaseModel } from "../../../MunchiJS/src/BaseModel";

export class InviteModel extends BaseModel {
    @Property({ ref: "User", required: true })
    invitee!: ObjectId;

    @Property({ ref: "User", required: true })
    inviter!: ObjectId;

    @Property({ ref: "Role", required: true })
    role!: ObjectId;

    @Property({ required: true })
    entityId!: string;

    @Property({ required: true })
    entityType!: string;
}

const Invite = getModelFromClass<InviteModel>(InviteModel);

export default Invite;
