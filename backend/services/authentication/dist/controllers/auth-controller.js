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
const user_model_1 = require("../models/user-model");
const mongoose_1 = require("mongoose");
const registerUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = request.body;
    const existingUser = yield user_model_1.User.findOne({ email });
    // If we have an existing user
    if (existingUser) {
    }
    const user = yield user_model_1.User.create({ email, username, password });
    yield user.save();
    // Get JWT token and return it
    return response.status(201).json({ success: true, userData: user });
});
exports.registerUser = registerUser;
const verifyEmailAddress = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ownerId, OTP } = request.body;
    if (!(0, mongoose_1.isValidObjectId)(ownerId)) {
    }
    if (!OTP) { // If no OTP is entered throw an error
    }
});
exports.verifyEmailAddress = verifyEmailAddress;
const login = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
});
exports.login = login;
const verifyLoginMfa = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.verifyLoginMfa = verifyLoginMfa;
const logout = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.logout = logout;
const getCurrentUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getCurrentUser = getCurrentUser;
const forgotPassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.forgotPassword = forgotPassword;
const resetPassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.resetPassword = resetPassword;
const updatePassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentPassword = request.body.currentPassword;
    const newPassword = request.body.newPassword;
});
exports.updatePassword = updatePassword;
const updateProfileDetails = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updateProfileDetails = updateProfileDetails;
//# sourceMappingURL=auth-controller.js.map