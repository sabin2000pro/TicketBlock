"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verify_auth_1 = require("./../middleware/verify-auth");
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth-controller");
const authRouter = express_1.default.Router();
// Authentication Routes
authRouter.route('/register').post(auth_controller_1.registerUser);
authRouter.route('/verify-email').post(auth_controller_1.verifyEmailAddress);
authRouter.route('/login').post(auth_controller_1.login);
authRouter.route('/logout').get(auth_controller_1.logout);
authRouter.route('/forgot-password').post(auth_controller_1.forgotPassword);
authRouter.route('/reset-password').post(auth_controller_1.resetPassword);
authRouter.route('/me').get(verify_auth_1.verifyUserAuth, auth_controller_1.getCurrentUser);
authRouter.route('/verify-mfa').post(auth_controller_1.verifyLoginMfa);
exports.default = authRouter;
