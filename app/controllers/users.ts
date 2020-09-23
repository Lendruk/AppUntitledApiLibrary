import { ErrorManager } from "../../../MunchiJS/src/ErrorManager";
import { Controller } from "../../../MunchiJS/src/decorators/controller";
import { Get, Post, Put } from "../../../MunchiJS/src/decorators/verbs";
import { BaseController } from "../../../MunchiJS/src/BaseController";
import User from "../models/user";
import bcrypt from "bcryptjs";
import { Request } from "../../../MunchiJS/src/types/Request";
import { View } from "../../../MunchiJS/src/decorators/ViewHandler";

@Controller("/users")
export class UserController extends BaseController {
    @Get("/")
    public async getUsers(req: Request): Promise<object> {
        console.log("body", req.body);
        const t = new User({ name: "test", role: "test" });
        return { good: "Boost" };
    }

    @View("Home")
    @Get("/test")
    public async testView(req: Request): Promise<object> {
        return { good: "Boost", city: "city", user: { name: "bob", address: { street: "test street" } } };
    }

    @Get("/:id", { requireToken: true })
    public async getUser(req: Request): Promise<object> {
        const {
            params: { id },
        } = req;
        let user;
        try {
            user = await User.findOne({ _id: id });
        } catch (err) {
            throw ErrorManager.errors.NOT_FOUND;
        }
        return { user: user?.getPublicInformation() };
    }

    @Put("/:id", { requireToken: true })
    public async putUser(req: Request): Promise<object> {
        const {
            body,
            params: { id },
        } = req;
        let user;
        try {
            user = await User.findOneAndUpdate({ _id: id }, body, { new: true });
        } catch {
            throw ErrorManager.errors.BAD_REQUEST;
        }
        return { user: user?.getPublicInformation() };
    }

    @Post("/register", { body: { required: ["password", "email", "name"] } })
    public async registerUser(req: Request): Promise<object> {
        const {
            body: { name, password, email },
            headers,
        } = req;
        if (await User.findOne({ email: email })) {
            throw ErrorManager.errors.EMAIL_ALREADY_IN_USE;
        }
        const newUser = await new User({ name, password: await this.hashPassword(password), email }).save();
        return {
            status: 201,
            code: "USER_REGISTERED",
            message: "Account successfully created",
            user: newUser.getPublicInformation(),
        };
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
}
