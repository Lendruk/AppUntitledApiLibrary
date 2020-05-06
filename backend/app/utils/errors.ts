import { ErrorType } from "../lib/types/error";
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
    NOT_FOUND: {
        status: 404,
        code: "NOT_FOUND",
    },
    SERVER_ERROR: {
        status: 500,
        code: "SERVER_ERROR",
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
        });

    }
}