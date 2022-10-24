"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const verify_auth_1 = require("./../middleware/verify-auth");
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth-controller");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.authRouter = express_1.default.Router();
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
});
// Authentication Routes
exports.authRouter.route('/register').post(authLimiter, auth_controller_1.registerUser);
exports.authRouter.route('/verify-email').post(authLimiter, auth_controller_1.verifyEmailAddress);
exports.authRouter.route('/login').post(authLimiter, auth_controller_1.login);
exports.authRouter.route('/logout').get(authLimiter, auth_controller_1.logout);
exports.authRouter.route('/forgot-password').post(authLimiter, auth_controller_1.forgotPassword);
exports.authRouter.route('/reset-password').post(authLimiter, auth_controller_1.resetPassword);
exports.authRouter.route('/me').get(authLimiter, verify_auth_1.verifyUserAuth, auth_controller_1.getCurrentUser);
exports.authRouter.route('/verify-mfa').post(authLimiter, auth_controller_1.verifyLoginMfa);
//# sourceMappingURL=auth-routes.js.map