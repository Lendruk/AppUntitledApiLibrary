import Permission from "../models/Permission";
import { UserModel } from "../models/User";
import { Request, Response, NextFunction } from "express";
import { errors } from "../utils/errors";

export class PermissionChecker {

        static async verifyPermission (controller : string, endpoint: string, next : NextFunction, user? : UserModel) {
            try {
                const permission = await Permission.findOne({ controller, endpoint }).lean();
                if(permission && user) {
                    if (Boolean(user.roles.find(elem => elem._id === permission._id))) {
                        next();
                    } else {
                        throw errors.NO_PERMISSION;
                    }
                }
        
                next();
            } catch (err) {
                next(err);
            }
        }
}