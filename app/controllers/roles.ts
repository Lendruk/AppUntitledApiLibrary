import { Controller } from "../../../MunchiJS/src/decorators/controller";
import { BaseController } from "../../../MunchiJS/src/BaseController";
import { Get, Post, Delete, Put, Patch } from "../../../MunchiJS/src/decorators/verbs";
import { Request, Response } from "express";
import Role from "../models/Role";
import ObjectId from "../../../MunchiJS/src/database/mongo/ObjectId";
import { ErrorManager } from "../../../MunchiJS/src/ErrorManager";

@Controller("/roles")
export class RoleController extends BaseController {
    @Get("/", { requireToken: true, headers: { required: ["workspace"] } })
    public async getRoles(req: Request, res: Response): Promise<object> {
        const {
            headers: { workspace },
        } = req;

        const roles = await Role.find({ workspace: new ObjectId(workspace as string) });

        return { roles };
    }

    @Post("/", {
        requireToken: true,
        body: { required: ["name", "permissions"] },
        // headers: { required: ["workspace"] }
    })
    public async postRole(req: Request, res: Response): Promise<object> {
        const {
            headers: { workspace },
            body,
        } = req;

        //TODO: Validations
        const newRole = await new Role({ ...body }).save();

        return { status: 201, role: newRole };
    }

    @Put("/:id", { params: { required: ["id"] } })
    public async putRole(req: Request, res: Response): Promise<object> {
        const {
            params: { id },
            body,
        } = req;

        let role = null;

        try {
            role = await Role.findOneAndUpdate({ _id: new ObjectId(id) }, body, { new: true, runValidators: true });
        } catch {
            throw ErrorManager.errors.DB_FAILED_UPDATE;
        }

        return { role };
    }

    @Patch("/:id", { body: { required: ["_active"] }, params: { required: ["id"] } })
    public async patchRole(req: Request, res: Response): Promise<object> {
        const {
            params: { id },
            body: { _active },
        } = req;

        try {
            await Role.findOneAndUpdate({ _id: new ObjectId(id) }, { _active });
        } catch {
            throw ErrorManager.errors.DB_FAILED_UPDATE;
        }

        return { status: 200 };
    }

    @Delete("/:id", { params: { required: ["id"] } })
    public async deleteRole(req: Request, res: Response): Promise<object> {
        const {
            params: { id },
        } = req;

        //TODO: Remove Role from all users;

        await Role.deleteOne({ _id: new ObjectId(id) });

        return { status: 200 };
    }
}
