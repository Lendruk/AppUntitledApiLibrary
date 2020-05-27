import Permission from "../models/Permission";
import Role from "../models/Role";
import { UserModel } from "../models/User";

export class PermissionChecker {

    static async verifyPermission(controller : string, endpoint: string, user : UserModel) {

        const permission = await Permission.findOne({ controller, endpoint }).lean();
        if(permission) {
            return user.roles.find(elem => elem)
        }
    }
}