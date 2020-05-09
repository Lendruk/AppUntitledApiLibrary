import { Request, Response, NextFunction } from 'express';
import { errors } from '../utils/errors';
import { Controller } from '../lib/decorators/Controller';
import { Get, Post } from '../lib/decorators/Verbs';
import { BaseController } from '../lib/classes/BaseController';
import User from '../models/User';
import { Middleware } from '../lib/decorators/Middleware';
import { Inject } from '../lib/decorators/Inject';
import { LoginService } from '../services/LoginService';


@Controller("/users")
export class UserController extends BaseController {

    @Inject()
    _loginService! : LoginService;

    @Get("/")
    public async getUsers(req : Request, res : Response) {

        console.log("body", req.body);
        const t = new User({ name: "test", role: "test" });
        return { good: "Boost" };
    }

    @Post("/register")
    public async registerUser(req : Request, res : Response) {
        const { body: { name, password, email }} = req;

        const newUser = await new User({ name, password, email }).save();

        return { code: 201, status: "USER_REGISTERED", ...await this._loginService.login(newUser.email, newUser.password)}
    }
}