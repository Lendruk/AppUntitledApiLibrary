import { Request, Response, NextFunction } from "express";
import { RouteOptions } from "../types/RouteOptions";

export interface RouteType {
    path: string;

    requestMethod: "get" | "post" | "put" | "patch" | "delete";

    methodName: string | symbol;

    middleware?: Function[];

    propertyKey?: string | symbol;

    routeOptions?: RouteOptions;
}

export interface MiddyPair {
    functions: MiddyFunctions;
    method: string | symbol;
}

export type MiddyFunctions = Array<MiddyFunction>;

export type MiddyFunction = (req: Request, res: Response, next: NextFunction) => void;