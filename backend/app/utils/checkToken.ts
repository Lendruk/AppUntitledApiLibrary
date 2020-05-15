import { Request, Response, NextFunction } from "express";
import { errors } from "./errors";
import Token from "../models/Token";

export const checkToken = async (req : Request, res : Response, next : NextFunction) => {
    const { authorization } = req.headers;

    if(!authorization) throw errors.NO_TOKEN;

    const splitToken : string[] = authorization.split(' ');

    if(splitToken[0] !== "Bearer" || splitToken[1] == null || splitToken[1] == "null" ) throw errors.INVALID_TOKEN;

    const tbToken = await Token.findOne({ authToken: authorization }).lean();

    if(!tbToken) throw errors.INVALID_TOKEN;

    next();
}