import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

export interface IErrorResponse { // Error Response interface
    message: string;
    statusCode: number | undefined;
    status: string | undefined;
    processErrors(): IError
}

export interface IError { // Error Interface
    message: string;
    statusCode: number;
    status: string;
}

export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract status: string;

    constructor(message: string) {
        super(message)
    }

    public serializeErrors(): IError {
        return {message: this.message, statusCode: this.statusCode, status: this.status}
    }

}

export const errorHandler = (err: Error, request: Request, response: Response, next: NextFunction) => {

    if(err instanceof CustomError) {
        return response.status(StatusCodes.NOT_FOUND).json({message: err.message, errors: err.serializeErrors() })
    }

    return next();
}

