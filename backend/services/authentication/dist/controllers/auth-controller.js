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
exports.updateProfileDetails = exports.updatePassword = exports.resetPassword = exports.getCurrentUser = exports.logout = exports.verifyLoginMfa = exports.forgotPassword = exports.login = exports.verifyEmailAddress = exports.registerUser = void 0;
const generate_otp_token_1 = require("./../utils/generate-otp-token");
const send_email_1 = require("./../utils/send-email");
const generate_reset_token_1 = require("./../utils/generate-reset-token");
const error_handler_1 = require("../middleware/error-handler");
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = require("../models/user-model");
const mongoose_1 = require("mongoose");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const password_reset_model_1 = require("../models/password-reset-model");
const two_factor_verification_model_1 = require("../models/two-factor-verification-model");
const email_verification_model_1 = require("../models/email-verification-model");
const sendConfirmationEmail = (transporter, newUser, userOTP) => {
    return transporter.sendMail({
        from: 'verification@ethertix.com',
        to: newUser.email,
        subject: 'E-mail Verification',
        html: `
        
        <p>Your verification OTP</p>
        <h1> ${userOTP}</h1>
        `
    });
};
const registerUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = request.body;
    const existingUser = yield user_model_1.User.findOne({ email });
    if (existingUser) {
        return next(new error_handler_1.BadRequestError("User already exists", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const user = yield user_model_1.User.create({ username, email, password });
    yield user.save();
    const currentUser = user._id; // Get the current user's ID
    const userOTP = (0, generate_otp_token_1.generateOTPToken)();
    console.log(`Your OTP token : ${userOTP}`);
    const verificationToken = new email_verification_model_1.EmailVerification({ owner: currentUser, token: userOTP });
    yield verificationToken.save();
    // Send e-mail verification to user
    const transporter = (0, send_email_1.emailTransporter)();
    sendConfirmationEmail(transporter, user, userOTP);
    const userOTPVerification = new email_verification_model_1.EmailVerification({ owner: user._id, token: userOTP });
    yield userOTPVerification.save();
    return sendTokenResponse(request, user, http_status_codes_1.StatusCodes.CREATED, response);
});
exports.registerUser = registerUser;
// @desc      Verify User's E-mail Address
// @route     POST /api/v1/auth/verify-email
// @access    Public (No Authorization Token Required)
exports.verifyEmailAddress = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, OTP } = request.body;
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        return next(new error_handler_1.NotFoundError("Could not find that user", 404));
    }
    if (!OTP) {
        return next(new error_handler_1.NotFoundError("No OTP found. Please check entry again", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    const otpToken = yield email_verification_model_1.EmailVerification.findOne({ owner: userId });
    if (!otpToken) {
        return next(new error_handler_1.BadRequestError(`OTP Verification token is not found. Please try again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Check to see if tokens match
    const otpTokensMatch = otpToken.compareOtpTokens(OTP);
    if (!otpTokensMatch) {
        return next(new error_handler_1.BadRequestError("OTP Tokens do not match. Please try again later", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    user.isVerified = true;
    yield user.save();
    yield email_verification_model_1.EmailVerification.findByIdAndDelete(otpToken._id);
    // Send token
    return sendTokenResponse(request, user, 200, response);
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
    if (!user.isVerified) {
        return next(new error_handler_1.BadRequestError("Account not verified. Please verify your account before logging in", 400));
    }
    const passwordsMatch = yield user.compareLoginPasswords(password);
    if (!passwordsMatch) {
        return next(new error_handler_1.BadRequestError("Passwords do not match. Please try again", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    return sendTokenResponse(request, user, http_status_codes_1.StatusCodes.OK, response);
}));
const forgotPassword = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = request.body;
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        return next(new error_handler_1.NotFoundError("No user found with that e-mail address", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    const userHasResetToken = yield password_reset_model_1.PasswordReset.findOne({ owner: user._id });
    // If the user already has the reset token
    if (userHasResetToken) {
        return next(new error_handler_1.BadRequestError("You already have the reset password token. Try again later.", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const token = (0, generate_reset_token_1.generateRandomResetPasswordToken)();
    if (token === undefined) {
        return next(new error_handler_1.BadRequestError("Reset Password Token is invalid", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const resetPasswordToken = yield password_reset_model_1.PasswordReset.create({ owner: user._id, resetToken: token });
    yield resetPasswordToken.save();
    const resetPasswordURL = `http://localhost:3000/auth/api/reset-password?token=${token}&id=${user._id}`; // Create the reset password URL
    sendPasswordResetEmail(user, resetPasswordURL);
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Reset Password E-mail Sent", data: user });
});
exports.forgotPassword = forgotPassword;
const sendPasswordResetEmail = (user, resetPasswordURL) => {
    const transporter = (0, send_email_1.emailTransporter)();
    transporter.sendMail({
        from: 'resetpassword@ticketblock.com',
        to: user.email,
        subject: 'Reset Password',
        html: `
            
            <h1> ${resetPasswordURL}</h1>
            `
    });
};
const verifyLoginMfa = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, multiFactorToken } = request.body;
    const user = yield user_model_1.User.findById(userId);
    if ((0, mongoose_1.isValidObjectId)(userId)) {
        return next(new error_handler_1.NotFoundError("User ID not valid", 404));
    }
    if (!multiFactorToken) {
        user.isActive = (!user.isActive);
        return next(new error_handler_1.BadRequestError("Please provide your MFA token", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const factorToken = yield two_factor_verification_model_1.TwoFactorVerification.findOne({ owner: userId });
    if (!factorToken) {
        return next(new error_handler_1.BadRequestError("The token associated to the user is invalid", 400));
    }
    // Verify to see if the tokens match
    const mfaTokensMatch = factorToken.comapareMfaTokens(multiFactorToken);
    if (!mfaTokensMatch) {
        user.isActive = (!user.isActive);
        user.isVerified = (!user.isVerified);
        return next(new error_handler_1.BadRequestError("The MFA token you entered is invalid. Try again", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Otherwise
    user.isActive = true;
    user.isVerified = true;
    factorToken.token = undefined;
    yield user.save();
    return sendTokenResponse(request, user, 200, response);
});
exports.verifyLoginMfa = verifyLoginMfa;
// @desc      Logout User
// @route     GET /api/v1/auth/logout
// @access    Private (JWT Token Required)
exports.logout = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    request.session = null;
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "You have logged out", data: {} });
}));
// @desc      Get Currently Logged In User
// @route     GET /api/v1/auth/me
// @access    Private (Authorization Token Required)
const getCurrentUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.user;
    console.log(`User data ; ${user}`);
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: user });
});
exports.getCurrentUser = getCurrentUser;
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
    const fieldsToUpdate = { email: request.body.email, username: request.body.username };
});
exports.updateProfileDetails = updateProfileDetails;
const sendTokenResponse = (request, user, statusCode, response) => {
    const token = user.returnAuthToken();
    request.session = { token };
    return response.status(statusCode).json({ data: user, token });
};
