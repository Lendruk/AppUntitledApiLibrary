import { mongoose } from '../utils/database';
import { Property, getModelFromClass } from '../lib/decorators/model';
import { ObjectId } from '../lib/ObjectId';

// Application Model
export class UserModel extends mongoose.Document {
    @Property({ type: String, required: true, default: "bob" })
    name : string;

    @Property({ type: String, required: true, default: "user" })
    role : string;

    house : ObjectId;

    constructor(name : string, role : string, house : ObjectId) {
        super();
        this.name = name;
        this.role = role;
        this.house = house;
    }

};
const User = getModelFromClass<UserModel>(UserModel);

export default User;