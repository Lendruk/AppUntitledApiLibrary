import { BaseController } from "../lib/classes/BaseController";
import { Controller } from "../lib/decorators/controller";
import { Post, Get } from "../lib/decorators/verbs";
import { Request, Response } from "express";
import User from "../models/user";
import { errors } from "../utils/errors";
import { LoginService } from "../services/LoginService";
import { Inject } from "../lib/decorators/Inject";

@Controller("/auth")
export class AuthController extends BaseController {

    @Inject()
    _loginService!: LoginService;

    @Post("/login")
    public async loginUser(req: Request, res: Response) {
        const { body: { email, password } } = req;

        if (!email || !password) throw errors.REQUIRED_FIELDS_EMPTY;

        return { status: 'LOGIN_SUCCESSFULL', message: "Login Successful", ...await this._loginService.login(email, password) };
    }
}