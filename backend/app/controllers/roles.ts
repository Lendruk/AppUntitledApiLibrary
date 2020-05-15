import { Controller } from "../lib/decorators/Controller";
import { BaseController } from "../lib/classes/BaseController";
import { Get, Post } from "../lib/decorators/Verbs";
import { Request, Response } from "express";
import Role from "../models/Role";
import { ObjectId } from "../lib/ObjectId";

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
        headers: { required: ["workspace"] } 
    })
    public async createRole(req : Request, res : Response) {
        const { headers: { workspace }, body } = req;

        //TODO: Validations

        const newRole = await new Role(body).save();

        return { code: 201, role: newRole };
    }
}