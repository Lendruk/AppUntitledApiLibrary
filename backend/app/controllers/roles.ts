import { Controller } from "../lib/decorators/Controller";
import { BaseController } from "../lib/classes/BaseController";
import { Get, Post, Delete, Put, Patch } from "../lib/decorators/Verbs";
import { Request, Response } from "express";
import Role from "../models/Role";
import { ObjectId } from "../lib/ObjectId";
import { errors } from "../utils/errors";

@Controller("/roles")
export class RoleController extends BaseController {

    @Get("/", { requireToken: true, headers: { required: ["workspace"] } })
    public async getRoles(req : Request, res : Response) {
        const { headers: { workspace } } = req;

        const roles = await Role.find({ workspace: new ObjectId(workspace as string) });

        return { roles };
    }

    @Post("/", { requireToken: true,
        body: { required: ["name", "permissions"]},
        // headers: { required: ["workspace"] } 
    })
    public async postRole(req : Request, res : Response) {
        const { headers: { workspace }, body } = req;

        //TODO: Validations
        const newRole = await new Role({ ...body }).save();

        return { code: 201, role: newRole };
    }

    @Put("/:id", { params: { required: ["id"] } })
    public async putRole(req: Request, res: Response) {
        const { params: { id }, body } = req;

        let role = null;
        
        try {
            role = await Role.findOneAndUpdate({ _id: id}, body, { new: true, runValidators: true });
        } catch {
            throw errors.DB_FAILED_UPDATE;
        }

        return { role };

    }

    @Patch("/:id", { body: { required: ["_active"] }, params: { required: ["id"]}})
    public async patchRole(req: Request, res: Response) {
        const { params: { id }, body: { _active } } = req;

        try {
            await Role.findOneAndUpdate({ _id: id }, { _active });
        } catch {
            throw errors.DB_FAILED_UPDATE;
        }

        return { code: 200 };
    }

    @Delete("/:id",{ params: { required: ["id"] } })
    public async deleteRole(req : Request, res : Response) {   
        const { params: { id } } = req;

        //TODO: Remove Role from all users;

        await Role.deleteOne({ _id: id });

        return { code: 200 };
    }
}