import { BaseController } from "../lib/classes/BaseController";
import { Controller } from "../lib/decorators/controller";
import { Post, Get } from "../lib/decorators/verbs";
import { Request, Response } from "express";
import User from "../models/user";
import { errors } from "../utils/errors";
import { LoginService } from "../services/LoginService";
import { Inject } from "../lib/decorators/Inject";
import Token from "../models/token";
import { checkToken } from "../utils/checkToken";

@Controller("/auth")
export class AuthController extends BaseController {

    @Inject()
    _loginService!: LoginService;

    @Post("/login")
    public async loginUser(req: Request, res: Response) {
        const { body: { email, password } } = req;

        if (!email || !password) throw errors.REQUIRED_FIELDS_EMPTY;
        return { code: 'LOGIN_SUCCESSFUL', message: "Login Successful", ...await this._loginService.login(email, password) };
    }

    @Post("/logout", { requireToken: true })
    public async logout(req: Request) {
        const { authorization } = req.headers;
        console.log('Auth ', authorization);
        if (!authorization) throw errors.NO_TOKEN;
        const splitToken: string[] = authorization.split(' ');
        await Token.findOneAndDelete({ authToken: splitToken[1] }).lean();

        return { code: 'LOGOUT_SUCCESSFUL', message: 'Logged out successfully' }
    }
}