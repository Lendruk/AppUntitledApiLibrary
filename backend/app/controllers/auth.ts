import { BaseController } from "./BaseController";
import { Controller } from "../lib/decorators/Controller";
import { Post } from "../lib/decorators/Verbs";
import { Request, Response } from "express";

@Controller("/auth")
export class AuthController extends BaseController {

    @Post("/login")
    public async loginUser(req : Request, res : Response) {

        return { code: 200 };
    }
}