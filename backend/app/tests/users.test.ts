import dbConnection, { mongoose } from "../utils/database";
import { UserController } from "../controllers/users";
import { Request } from "express";

describe("Auth", () => {
    let controller : UserController;
    beforeAll(async () => {
        await dbConnection();
        controller = new UserController();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe("Create User", () => {
        describe("With valid parameters", () => {
            const userToCreate = {
                name: "User",
                password: "nice password",
                email: "email@emailProvider.com",
                _id: "507f1f77bcf86cd799439011",
            };
            
            beforeAll(async () => {
                const request = { };
                controller.registerUser();
            });
        });
    });
});