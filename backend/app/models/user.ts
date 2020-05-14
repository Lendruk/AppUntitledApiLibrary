import { mongoose } from '../utils/database';
import { Property, getModelFromClass } from '../lib/decorators/Model';
import bycrypt from 'bcrypt';
import { ObjectId } from '../lib/ObjectId';
import { IActivatable } from '../lib/interfaces/IActivatable';
import Role, { RoleModel } from './Role';

// Application Model
export class UserModel extends mongoose.Document implements IActivatable {
    
    @Property({ default: true })
    isActive: boolean;

    @Property({ required: true })
    name: string;

    @Property({ required: true })
    email: string;

    @Property({ required: true })
    password: string;

    @Property({ items: Role })
    roles!: RoleModel[];

    constructor(name : string, email: string, password : string) {
        super();
        this.name = name;
        this.password = password;
        this.email = email;
        this.isActive = true;
    }

    comparePassword(candidatePassword : string) : boolean {
        return this.password ? bycrypt.compareSync(candidatePassword, this.password) : false;
    }

    getPublicInformation() {
        return {
            name: this.name,
            // role: this.role,
            email: this.email,
            isActive: this.isActive
        };
    }
};
const User = getModelFromClass<UserModel>(UserModel);

export default User;