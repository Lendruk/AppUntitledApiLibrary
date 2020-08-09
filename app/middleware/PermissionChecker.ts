import Permission, { PermissionModel } from "../models/Permission";
import { UserModel } from "../models/user";
import { NextFunction } from "express";
import { Request } from "../lib/types/Request";
import Workspace from "../models/Workspace";
import { Response } from "../lib/types/Response";

export class PermissionChecker {
    static verifyPermission(req: Request, res: Response, next: NextFunction) {
        const user = req.user as UserModel;
        const {
            headers: { workspace },
        } = req;

        console.log("check permission");
        // try {
        //     let workspaceObj = null;
        //     const permission = await Permission.findOne({ controller, endpoint }).lean();

        //     if (workspace) {
        //         workspaceObj = await Workspace.findOne({ _id: workspace }).lean();
        //     }

        //     if (workspaceObj) {
        //         if (permission && user) {
        //             if (
        //                 Boolean(
        //                     workspaceObj.users.find(
        //                         (elem) =>
        //                             elem.user === user._id &&
        //                             Boolean(
        //                                 elem.roles.find((role) => role.hasPermission(permission as PermissionModel))
        //                             )
        //                     )
        //                 )
        //             ) {
        //                 next();
        //             } else {
        //                 throw ErrorManager.errorsNO_PERMISSION;
        //             }
        //         }
        //     }
        //     next();
        // } catch (err) {
        //     next(err);
        // }

        next();
    }
}
