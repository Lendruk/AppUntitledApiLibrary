import Permission, { PermissionModel } from "../models/Permission";
import { UserModel } from "../models/user";
import { NextFunction } from "express";
import { errors } from "../utils/errors";
import { Request } from "../lib/types/Request";
import Workspace, { WorkspaceModel } from "../models/Workspace";
import { ObjectId } from "../lib/ObjectId";

export class PermissionChecker {

    static async verifyPermission(controller: string, endpoint: string, next: NextFunction, req: Request) {
        let user = req.user as UserModel;
        const { headers: { workspace } } = req;
        try {
            let workspaceObj = null;
            const permission = await Permission.findOne({ controller, endpoint }).lean();

            if (workspace) {
                workspaceObj = await Workspace.findOne({ _id: workspace as string }).lean();
            }

            if (workspaceObj) {
                if (permission && user) {
                    if (Boolean(workspaceObj.users.find(elem => elem.user === new ObjectId(user._id) &&
                        Boolean(elem.roles.find(role => role.hasPermission(permission as PermissionModel)))))) {
                        next();
                    } else {
                        throw errors.NO_PERMISSION;
                    }
                }
            }
            next();
        } catch (err) {
            next(err);
        }
    }
}