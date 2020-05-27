import { mongoose } from '../utils/database';
import { BaseController } from '../lib/classes/BaseController';
import { Controller } from '../lib/decorators/Controller';
import { Get, Post, Delete, Put } from '../lib/decorators/Verbs';
import { Request, Response } from 'express';
import Permission from '../models/Permission';
import { errors } from '../utils/errors';

@Controller("/permissions")
export class PermissionController extends BaseController {

    @Get("/")
    public async getPermissions(req : Request, res : Response) {
        
        return { permissions: await Permission.find({}) };
    }

    @Post("/", { body: { required: ["name", "_active", "endpoint", "controller"]} })
    public async postPermission(req : Request, res : Response) {
        const { body: { name, _active, endpoint, controller } } = req;

        let newPermission;
        try {
            newPermission = await new Permission({ name, _active, endpoint, controller }).save();
        } catch {
            throw errors.RESOURCE_ALREADY_EXISTS;
        }

        return { permission: newPermission, code: 201 };
    }

    @Put("/:id",{ params: { required: ["id"] }})
    public async putPermission(req: Request, res: Response) {
        const { body, params: { id } } = req;
        
        let updatedPermission;
        try {
            updatedPermission = await Permission.findOneAndUpdate({ _id: id }, body, { new: true });
        } catch {
            throw errors.DB_FAILED_UPDATE;
        }

        return { permission: updatedPermission };
    }

    @Delete("/:id", { params: { required: [ "id" ] } })
    public async deletePermission(req : Request, res : Response) {
        const { params: { id} } = req;

        await Permission.deleteOne({ _id: id });
    }
}