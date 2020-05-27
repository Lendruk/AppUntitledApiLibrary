import { Request, Response } from 'express';
import { errors } from '../utils/errors';
import { Controller } from '../lib/decorators/Controller';
import { Get, Post } from '../lib/decorators/Verbs';
import { BaseController } from '../lib/classes/BaseController';
import User from '../models/User';
import bcrypt from 'bcrypt';

@Controller("/users")
export class UserController extends BaseController {

    @Get("/")
    public async getUsers(req : Request, res : Response) {

        console.log("body", req.body);
        const t = new User({ name: "test", role: "test" });
        return { good: "Boost" };
    }

    @Get("/:id")
    public async getUser(req : Request, res : Response) {
        const { params: { id }} = req;

        let user;
        try {
            user = await User.findOne({_id: id });
        } catch (err) {
            throw errors.NOT_FOUND;
        }

        return { user };
    }

    @Post("/register", { body: { required: ["password", "email", "name"] }})
    public async registerUser(req : Request, res : Response) {
        const { body: { name, password, email }} = req;

        if(await User.findOne({ email: email })) {
            throw errors.RESOURCE_ALREADY_EXISTS;
        }

        const newUser = await new User({ name, password: await this.hashPassword(password), email }).save();

        return { code: 201, status: "USER_REGISTERED", user: newUser.getPublicInformation() };
    }

    private async hashPassword(password : string) : Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        return hash;
    }
}