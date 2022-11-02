"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./../controllers/auth-controller");
const verify_auth_1 = require("./../middleware/verify-auth");
const express_1 = __importDefault(require("express"));
const auth_controller_2 = require("../controllers/auth-controller");
const authRouter = express_1.default.Router();
// Authentication Routes
authRouter.route('/register').post(auth_controller_2.registerUser);
authRouter.route('/verify-email').post(auth_controller_2.verifyEmailAddress);
authRouter.route('/login').post(auth_controller_2.login);
authRouter.route('/logout').get(auth_controller_2.logout);
authRouter.route('/forgot-password').post(auth_controller_2.forgotPassword);
authRouter.route('/reset-password').post(auth_controller_2.resetPassword);
authRouter.route('/me').get(verify_auth_1.verifyUserAuth, auth_controller_2.getCurrentUser);
authRouter.route('/verify-mfa').post(auth_controller_2.verifyLoginMfa);
authRouter.route('/update-profile').post(verify_auth_1.verifyUserAuth, auth_controller_1.updateProfileDetails);
exports.default = authRouter;
