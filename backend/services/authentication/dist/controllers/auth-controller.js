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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileDetails = exports.updatePassword = exports.resetPassword = exports.forgotPassword = exports.getCurrentUser = exports.logout = exports.verifyLoginMfa = exports.login = exports.verifyEmailAddress = exports.registerUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = require("../models/user-model");
// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)
const registerUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password, passwordConfirm } = request.body;
    const existingUser = yield user_model_1.User.findOne({ email });
    const user = yield user_model_1.User.create({ email, username, password, passwordConfirm });
    yield user.save();
    // Get JWT token and return it
    return response.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, userData: user });
});
exports.registerUser = registerUser;
// @desc      Verify User's E-mail Address
// @route     POST /api/v1/auth/verify-email
// @access    Public (No Authorization Token Required)
const verifyEmailAddress = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ownerId, OTP } = request.body;
});
exports.verifyEmailAddress = verifyEmailAddress;
// @desc      Login User
// @route     POST /api/v1/auth/login
// @access    Public (No Authorization Token Required)
const login = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
});
exports.login = login;
// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)
const verifyLoginMfa = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.verifyLoginMfa = verifyLoginMfa;
// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)
const logout = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.logout = logout;
// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)
const getCurrentUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getCurrentUser = getCurrentUser;
// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)
const forgotPassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.forgotPassword = forgotPassword;
// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)
const resetPassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.resetPassword = resetPassword;
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
//# sourceMappingURL=auth-controller.js.map