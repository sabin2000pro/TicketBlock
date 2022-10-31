"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserAuth = void 0;
const http_status_codes_1 = require("http-status-codes");
const error_handler_1 = require("../middleware/error-handler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user-model");
const verifyUserAuth = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        // If the authorization header includes Bearer <>
        if (request.headers.authorization && request.headers.authorization.includes("Bearer")) {
            token = request.headers.authorization.split(" ")[1]; // Split by a space to get the token at the second index
        }
        if (!token) {
            return next(new error_handler_1.UnauthorizedError("You are unauthorized to perform this action", http_status_codes_1.StatusCodes.UNAUTHORIZED));
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
        request.user = yield user_model_1.User.findById(decoded._id);
        return next();
    }
    catch (err) {
        if (err) {
            console.log(err);
            return next(new error_handler_1.UnauthorizedError("You are unauthorized to perform this action", http_status_codes_1.StatusCodes.UNAUTHORIZED));
        }
    }
});
exports.verifyUserAuth = verifyUserAuth;
