import { mongoose } from "../utils/database";
import { ObjectId } from "../lib/ObjectId";
import { Property, ModelOptions } from "../lib/decorators/model";
import { Expiry } from "../lib/classes/Expiry";

@ModelOptions({ expireAfter: new Expiry({ days: 90 })})
export class Token extends mongoose.Document {
    @Property({ required: true, ref: "User" })
    user : ObjectId;

    @Property({ required: true })
    authToken : string;

    @Property({ required: true })
    expiryDate : string;

    constructor(user : ObjectId, authToken : string, expiryDate : string ) {
        super();
        this.user = user;
        this.authToken = authToken;
        this.expiryDate = expiryDate;
    }
}