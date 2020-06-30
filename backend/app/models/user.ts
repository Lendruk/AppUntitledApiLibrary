import { Property, getModelFromClass } from '../lib/decorators/model';
import bycrypt from 'bcryptjs';
import { IActivatable } from '../lib/interfaces/IActivatable';
import Role from './Role';
import bcrypt from 'bcryptjs';
import { BaseModel } from '../lib/classes/BaseModel';

// Application Model
export class UserModel extends BaseModel implements IActivatable {

    @Property({ default: true })
    _active!: boolean;

    @Property({ required: true })
    name!: string;

    @Property({ required: true })
    email!: string;

    @Property({ required: true })
    password!: string;

    @Property({ items: Role })
    roles!: typeof Role[];

    comparePassword(candidatePassword: string): boolean {
        return this.password ? bycrypt.compareSync(candidatePassword, this.password) : false;
    }

    getPublicInformation() {
        return {
            name: this.name,
            roles: this.roles,
            email: this.email,
            _active: this._active
        };
    }

    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        return hash;
    }
};
const User = getModelFromClass<UserModel>(UserModel);

export default User;