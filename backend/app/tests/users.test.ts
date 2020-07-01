import dotenv from 'dotenv';
dotenv.config();
import dbConnection, { mongoose } from "../utils/database";
import { UserController } from "../controllers/users";
import { Request, request } from "express";
import { Response } from "../lib/types/Response";
import User from "../models/user";

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
                email: "email2@emailProvider.com",
            };
            
            let response : Response = {};
            beforeAll(async () => {
                const request = {
                    body: {
                        ...userToCreate,
                    }
                 };
                response = await controller.registerUser(request);
            });

            afterAll(async () => {
                await User.findOneAndDelete({ _id: response.user._id });
            });

            it("return 201", () => expect(response.status).toEqual(201));
            it("User is being returned", () => expect(response.user).toBeTruthy());
            it("Name is User", () => expect(response.user.name).toEqual("User"));
            it("Email email2@emailProvider.com", () => expect(response.user.email).toEqual("email2@emailProvider.com"));
        });

        describe("With duplicate email", () => {
            const userToCreate = {
                name: "User",
                password: "nice password",
                email: "email2@emailProvider.com",
            };
            
            let response : Response = {};
            let duplicateResponse : Response = {};
            const request = {
                body: {
                    ...userToCreate,
                }
             };
            let error : any= null;
            beforeAll(async () => {
                response = await controller.registerUser(request);

                try  {
                    duplicateResponse = await controller.registerUser(request);
                } catch(err) {
                    error = err;
                }
                
            });

            afterAll(async () => {
                await User.findOneAndDelete({ _id: response.user._id });
            });

            it("Error exists", () => expect(error).toBeTruthy());
            it("return is 409",() => expect(error.status).toEqual(409));
        });
    });
});