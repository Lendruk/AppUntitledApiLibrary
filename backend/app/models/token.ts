import { mongoose } from "../utils/database";
import { ObjectId } from "../lib/ObjectId";
import { Property, ModelOptions, getModelFromClass } from "../lib/decorators/Model";
import { Expiry } from "../lib/classes/Expiry";

@ModelOptions({ expireAfter: new Expiry({ days: 90 })})
export class TokenModel extends mongoose.Document {
    @Property({ required: true, ref: "User" })
    user : ObjectId;

    @Property({ required: true })
    authToken : string;

    constructor(user : ObjectId, authToken : string) {
        super();
        this.user = user;
        this.authToken = authToken;
    }
}

const Token = getModelFromClass<TokenModel>(TokenModel);
export default Token;