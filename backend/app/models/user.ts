import { mongoose } from '../utils/database';

// Application Model
export interface IUser extends mongoose.Document {
    name : string,
    role : string,

};

// Database Model
export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;