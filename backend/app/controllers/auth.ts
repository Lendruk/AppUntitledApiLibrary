import { BaseController } from "../lib/classes/BaseController";
import { Controller } from "../lib/decorators/Controller";
import { Post, Get } from "../lib/decorators/Verbs";
import { Request, Response } from "express";
import User from "../models/User";
import { errors } from "../utils/errors";
import { LoginService } from "../services/LoginService";
import { Inject } from "../lib/decorators/Inject";

@Controller("/auth")
export class AuthController extends BaseController {

    @Inject()
    _loginService! : LoginService;

    @Post("/login")
    public async loginUser(req : Request, res : Response) {
        const { body: { email, password }} = req;

        if(!email || !password) throw errors.REQUIRED_FIELDS_EMPTY;

        return { status: 'LOGIN_SUCCESSFULL', ...await this._loginService.login(email, password) };
    }
}