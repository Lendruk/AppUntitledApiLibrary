import { Request, Response, NextFunction } from 'express';
import { errors } from '../utils/errors';
import { Controller } from '../lib/decorators/controller';
import { Get } from '../lib/decorators/verbs';
import { BaseController } from './BaseController';
import User from '../models/user';
import { Middleware } from '../lib/decorators/middleware';


@Controller("/users")
export class UserController extends BaseController {

    @Get("/")
    @Middleware(test(4))
    public async getUsers(req : Request, res : Response) {
        // const user = await User.findOne({ _id : "un" });

        console.log("body", req.body);
        const t = new User({ name: "test", role: "test" });

        return { good: "Boost" };
    }

    @Get("/test")
    public getTest(req : Request, res : Response) { 
        return { bad: "Boost" };
    }
}

function test(num : number) {
    console.log(num);
    
    return (req : Request, res : Response, next : NextFunction) => {
        req.body = "middy test";

        next();
    }
}