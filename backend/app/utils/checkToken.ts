import { Response, NextFunction } from "express";
import { errors } from "./errors";
import Token from "../models/Token";
import User from "../models/User";
import { Request } from "../lib/types/Request";

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) throw errors.NO_TOKEN;

        const splitToken: string[] = authorization.split(' ');

        if (splitToken[0] !== "Bearer" || splitToken[1] == null || splitToken[1] == "null") throw errors.INVALID_TOKEN;

        const tbToken = await Token.findOne({ authToken: splitToken[1] }).lean();

        if (!tbToken) throw errors.INVALID_TOKEN;
        // Assign user to the request
        const user = await User.findOne({ _id: tbToken.user }).populate(" roles ").lean();

        if (user) {
            req.user = user;
        }
    } catch (err) {
        next(err);
    }

    next();
}