import ObjectId from "../../../MunchiJS/src/database/mongo/ObjectId";
import { Property, ModelOptions, getModelFromClass } from "../../../MunchiJS/src/decorators/model";
import Expiry from "../../../MunchiJS/src/Expiry";
import { BaseModel } from "../../../MunchiJS/src/BaseModel";

@ModelOptions({ expireAfter: new Expiry({ days: 90 }) })
export class TokenModel extends BaseModel {
    @Property({ required: true, ref: "User" })
    user!: ObjectId;

    @Property({ required: true })
    authToken!: string;
}

const Token = getModelFromClass<TokenModel>(TokenModel);
export default Token;
