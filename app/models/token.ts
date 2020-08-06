import { mongoose } from "../utils/database";
import ObjectId from "../lib/ObjectId";
import { Property, ModelOptions, getModelFromClass } from "../lib/decorators/model";
import Expiry from "../lib/classes/Expiry";
import { BaseModel } from "../lib/classes/BaseModel";

@ModelOptions({ expireAfter: new Expiry({ days: 90 }) })
export class TokenModel extends BaseModel {
    @Property({ required: true, ref: "User" })
    user!: ObjectId;

    @Property({ required: true })
    authToken!: string;
}

const Token = getModelFromClass<TokenModel>(TokenModel);
export default Token;
