import { Injectable } from "../lib/decorators/Injectable";
import { errors } from "../utils/errors";
import User from "../models/User";
import { buildToken } from "../utils/TokenBuilder";

@Injectable()
export class LoginService {
    public async login(email : string, password : string) {

        let user = await User.findOne({ email: email });

        if(!user) throw errors.NOT_FOUND;
        if(!user.comparePassword(password) || !user._active) throw errors.INVALID_CREDENTIALS;

        const token = await buildToken(user._id);
        
        return { token: token.authToken, user: user.getPublicInformation() };
    } 
}