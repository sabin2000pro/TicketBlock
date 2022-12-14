import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

export interface IErrorResponse { // Error Response interface
    message: string;
    statusCode: number | undefined;
    status: string | undefined;
    processErrors(): IError
}

export interface IError { // Error Interface
    message: string; // Custom Error Message
    statusCode: number; // Status Code for the error
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

export const processErrors = (err: Error, _request: Request, response: Response, next: NextFunction) => {

    if(err instanceof CustomError) {
        return response.status(StatusCodes.NOT_FOUND).json({message: err.message, errors: err.serializeErrors() })
    }

    return next();
}


export class BadRequestError extends CustomError {
    statusCode = StatusCodes.BAD_REQUEST;
    status = "Bad Request Error."

  constructor(message: any, statusCode: any) {
        super(message);
        this.statusCode = statusCode;
  }

}

export class NotFoundError extends CustomError {
    statusCode = StatusCodes.BAD_REQUEST;
    status = "Resource not found on the server. Check resource again"

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
  }

}

export class JwtMalformedError extends CustomError {
    statusCode = StatusCodes.UNAUTHORIZED;
    status = "JWT Malformed. Please check its signature and/or payload"

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
  }

}

export class JwtExpiredError extends CustomError {
    statusCode = StatusCodes.UNAUTHORIZED;
    status = "JWT Has expired."

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
  }

}

export class UnauthorizedError extends CustomError {
    statusCode = StatusCodes.UNAUTHORIZED;
    status = "You are not authorized to perform this action"

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
  }

}

export class ForbiddenError extends CustomError {
    statusCode = StatusCodes.FORBIDDEN;
    status = "You are forbidden to perform this action. Please try again"

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
  }

}

export default processErrors