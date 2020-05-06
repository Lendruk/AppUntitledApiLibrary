import { Request, Response } from 'express';
import { errors } from '../utils/errors';
import { Controller } from '../lib/decorators/controller';
import { Get } from '../lib/decorators/verbs';
import { BaseController } from './BaseController';
import User from '../models/user';


@Controller("/users")
export class UserController extends BaseController {

    @Get("/")
    public async getUsers(req : Request, res : Response) {
        // const user = await User.findOne({ _id : "un" });

        const t = new User({ name: "test", role: "test" });

        return { good: "Boost" };
    }

    @Get("/test")
    public getTest(req : Request, res : Response) {

        
        return { bad: "Boost" };
    }
}