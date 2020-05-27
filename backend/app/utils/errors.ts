import { ErrorType } from "../lib/types/ErrorType";
import { Request, Response, NextFunction } from "express";

export const errors = {
    BAD_REQUEST: {
        status: 400,
        code: "BAD_REQUEST",
    },
    REQUIRED_FIELDS_EMPTY: {
        status: 400,
        code: "REQUIRED_FIELDS_EMPTY",
    },
    INVALID_CREDENTIALS: {
        status: 400,
        code: 'INVALID_CREDENTIALS',
    },
    NO_TOKEN: {
        status: 401,
        code: "NO_TOKEN",
    },
    INVALID_TOKEN: {
        status: 401,
        code: "INVALID_TOKEN",
    },
    NOT_FOUND: {
        status: 404,
        code: "NOT_FOUND",
    },
    RESOURCE_ALREADY_EXISTS: {
        status: 409,
        code: "RESOURCE_ALREADY_EXISTS",
    },
    SERVER_ERROR: {
        status: 500,
        code: "SERVER_ERROR",
    },
    DB_FAILED_UPDATE: {
        status: 500,
        code: "DB_FAILED_UPDATE",
    },
    FIELDS_EMPTY: (parameter : string, missingFields : Array<string>) => {
        return {
            status: 400,
            code: "REQUIRED_FIELDS_EMPTY",
            parameter,
            missingFields,
        };
    },
}


export class ErrorManager {
    static async handleError(err : ErrorType, req : Request, res : Response, next : NextFunction) {
        // const message = JSON.parse(err.message || "");

        if(!err) {
            err = errors.SERVER_ERROR;
        }

        console.error("[ERROR]", JSON.stringify(err));

        res.status(err.status).json({
            code: err.code,
            results: null,
            ...err,
        });

    }
}