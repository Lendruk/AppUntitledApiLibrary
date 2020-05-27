import { Request, Response, NextFunction } from "express";
import { errors } from "./errors";
import Token from "../models/Token";
import User from "../models/User";

export const checkToken = async (req : any, res : Response, next : NextFunction) => {
    const { authorization } = req.headers;

    if(!authorization) throw errors.NO_TOKEN;

    const splitToken : string[] = authorization.split(' ');

    if(splitToken[0] !== "Bearer" || splitToken[1] == null || splitToken[1] == "null" ) throw errors.INVALID_TOKEN;

    const tbToken = await Token.findOne({ authToken: authorization }).lean();

    if(!tbToken) throw errors.INVALID_TOKEN;

    // Assign user to the request
    const user = await User.findOne({ _id: tbToken.user }).populate(" roles ");
    
    req.user = user;

    next();
}