"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.BadRequestError = exports.errorHandler = exports.CustomError = void 0;
const http_status_codes_1 = require("http-status-codes");
class CustomError extends Error {
    constructor(message) {
        super(message);
    }
    serializeErrors() {
        return { message: this.message, statusCode: this.statusCode, status: this.status };
    }
}
exports.CustomError = CustomError;
const errorHandler = (err, request, response, next) => {
    if (err instanceof CustomError) {
        return response.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: err.message, errors: err.serializeErrors() });
    }
    return next();
};
exports.errorHandler = errorHandler;
class BadRequestError extends CustomError {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        this.status = "Bad Request Error.";
        this.statusCode = statusCode;
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends CustomError {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        this.status = "Resource not found on the server. Check resource again";
        this.statusCode = statusCode;
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=error-handler.js.map