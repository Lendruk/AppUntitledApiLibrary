import { Request as ExpressRequest } from "express";
import { UserModel } from "../../models/User";

export interface Request extends ExpressRequest {
    user? : Pick<UserModel, any>;
}
