import { ErrorType } from "../lib/types/ErrorType";
import { Request, Response, NextFunction } from "express";

export const errors = {
    BAD_REQUEST: {
        status: 400,
        message: "Bad Request",
        code: "BAD_REQUEST",
    },
    REQUIRED_FIELDS_EMPTY: {
        status: 400,
        message: "Required Fields Empty",
        code: "REQUIRED_FIELDS_EMPTY",
    },
    INVALID_CREDENTIALS: {
        status: 400,
        message: "Invalid Credentials",
        code: "INVALID_CREDENTIALS",
    },
    NO_TOKEN: {
        status: 401,
        message: "No Token",
        code: "NO_TOKEN",
    },
    INVALID_TOKEN: {
        status: 401,
        message: "Invalid Token",
        code: "INVALID_TOKEN",
    },
    NO_PERMISSION: {
        status: 403,
        message: "No Permission",
        code: "NO_PERMISSION",
    },
    NOT_FOUND: {
        status: 404,
        message: "Not Found",
        code: "NOT_FOUND",
    },
    RESOURCE_ALREADY_EXISTS: {
        status: 409,
        message: "Resource already exists",
        code: "RESOURCE_ALREADY_EXISTS",
    },
    EMAIL_ALREADY_IN_USE: {
        status: 409,
        message: "Email already in use",
        code: "EMAIL_ALREADY_IN_USE",
    },
    SERVER_ERROR: {
        status: 500,
        message: "Server Error",
        code: "SERVER_ERROR",
    },
    DB_FAILED_UPDATE: {
        status: 500,
        message: "DB Failed Update",
        code: "DB_FAILED_UPDATE",
    },
    FIELDS_EMPTY: (parameter: string, missingFields: Array<string>) => {
        return {
            status: 400,
            code: "REQUIRED_FIELDS_EMPTY",
            message: "Required Fields Empty",
            parameter,
            missingFields,
        };
    },
};

export class ErrorManager {
    static async handleError(err: ErrorType, req: Request, res: Response, next: NextFunction) {
        // const message = JSON.parse(err.message || "");

        if (!err) {
            err = errors.SERVER_ERROR;
        }

        console.error("[ERROR]", JSON.stringify(err));

        res.status(err.status).json({
            message: err.message,
            results: null,
            ...err,
        });
    }
}
