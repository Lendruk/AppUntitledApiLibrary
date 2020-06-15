import { mongoose } from "../utils/database";

export class ObjectId extends mongoose.Schema.Types.ObjectId {

    constructor(key : string) {
        super(key);
    }
    
 };