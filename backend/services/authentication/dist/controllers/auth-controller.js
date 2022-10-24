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
exports.updateProfileDetails = exports.updatePassword = exports.resetPassword = exports.forgotPassword = exports.getCurrentUser = exports.logout = exports.verifyLoginMfa = exports.login = exports.verifyEmailAddress = exports.registerUser = void 0;
const error_handler_1 = require("./../middleware/error-handler");
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = require("../models/user-model");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const registerUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password, passwordConfirm } = request.body;
    const existingUser = yield user_model_1.User.findOne({ email });
    if (!email || !username || !password || !passwordConfirm) {
        return next(new error_handler_1.NotFoundError("Some fields are missing. Please check again", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    if (existingUser) {
        return next(new error_handler_1.BadRequestError("User already exists", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const user = yield user_model_1.User.create({ email, username, password, passwordConfirm });
    yield user.save();
    return sendTokenResponse(request, user, http_status_codes_1.StatusCodes.CREATED, response);
});
exports.registerUser = registerUser;
// @desc      Verify User's E-mail Address
// @route     POST /api/v1/auth/verify-email
// @access    Public (No Authorization Token Required)
exports.verifyEmailAddress = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ownerId, OTP } = request.body;
    if (!OTP) {
        return next(new error_handler_1.NotFoundError("No OTP found. Please check entry again", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
}));
// @desc      Login User
// @route     POST /api/v1/auth/login
// @access    Public (No Authorization Token Required)
exports.login = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    if (!email || !password) {
        return next(new error_handler_1.NotFoundError("E-mail or password not found. Please check again", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        return next(new error_handler_1.NotFoundError("Could not find that user", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    const passwordsMatch = yield user.compareLoginPasswords(password);
    if (!passwordsMatch) {
        return next(new error_handler_1.BadRequestError("Passwords do not match. Please try again", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    return sendTokenResponse(request, user, 200, response);
}));
// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)
const verifyLoginMfa = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.verifyLoginMfa = verifyLoginMfa;
// @desc      Logout User
// @route     GET /api/v1/auth/logout
// @access    Private (JWT Token Required)
exports.logout = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Clear the session
    if (request.session !== null) {
        request.session = null;
    }
}));
// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)
exports.getCurrentUser = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.user._id;
    console.log(`User data ; ${user}`);
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, user });
}));
// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)
const forgotPassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.forgotPassword = forgotPassword;
// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)
exports.resetPassword = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
}));
// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)
const updatePassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentPassword = request.body.currentPassword;
    const newPassword = request.body.newPassword;
});
exports.updatePassword = updatePassword;
// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)
const updateProfileDetails = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updateProfileDetails = updateProfileDetails;
const sendTokenResponse = (request, user, statusCode, response) => {
    const token = user.returnAuthToken();
    request.session = { token };
    return response.status(statusCode).json({ success: true, user, token });
};
//# sourceMappingURL=auth-controller.js.map