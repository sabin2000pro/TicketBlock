import { verifyUserAuth } from './../middleware/verify-auth';
import express, {Router} from 'express';
import { registerUser, verifyEmailAddress, login, verifyLoginMfa, forgotPassword, resetPassword, logout, getCurrentUser } from '../controllers/auth-controller'
import rateLimit from "express-rate-limit";
export const authRouter: Router = express.Router()

const authLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
	standardHeaders: true,
	legacyHeaders: false, 
})

// Authentication Routes

authRouter.route('/register').post(authLimiter, registerUser as any)
authRouter.route('/verify-email').post(authLimiter, verifyEmailAddress as any)
authRouter.route('/login').post(authLimiter, login as any)
authRouter.route('/logout').get(authLimiter, logout as any);
authRouter.route('/forgot-password').post(authLimiter, forgotPassword as any);
authRouter.route('/reset-password').post(authLimiter, resetPassword as any);
authRouter.route('/me').get(authLimiter, verifyUserAuth as any, getCurrentUser as any);
authRouter.route('/verify-mfa').post(authLimiter, verifyLoginMfa as any)