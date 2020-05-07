import { mongoose } from '../utils/database';
import { Property, getModelFromClass } from '../lib/decorators/model';
import { ObjectId } from '../lib/ObjectId';

// Application Model
export class UserModel extends mongoose.Document {
    @Property({ required: true })
    name : string;

    @Property({ required: true })
    role : string;

    @Property({ ref: "House", default: null })
    house : ObjectId;

    @Property({ default: null })
    billing : {
        money : number
    }
    
    @Property({ default: null })
    test : String[]

    constructor(name : string, role : string, house : ObjectId) {
        super();
        this.name = name;
        this.role = role;
        this.house = house;
        this.billing = { money: 0 };
        this.test = [];
    }
};
const User = getModelFromClass<UserModel>(UserModel);

export default User;