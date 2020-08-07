import ObjectId from "../lib/ObjectId";
import { Property, getModelFromClass } from "../lib/decorators/model";
import { BaseModel } from "../lib/classes/BaseModel";

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
