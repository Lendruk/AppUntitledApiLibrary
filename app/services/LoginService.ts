import { Injectable } from "../lib/decorators/Injectable";
import { ErrorManager } from "../utils/ErrorManager";
import User from "../models/user";
import { buildToken } from "../utils/TokenBuilder";

@Injectable()
export class LoginService {
    public async login(email: string, password: string) {
        const user = await User.findOne({ email: email });
        if (!user) throw ErrorManager.errors.INVALID_CREDENTIALS;
        if (!user.comparePassword(password) || !user._active) throw ErrorManager.errors.INVALID_CREDENTIALS;
        const token = await buildToken(String(user._id));
        return { token: token.authToken, user: user.getPublicInformation() };
    }
}
