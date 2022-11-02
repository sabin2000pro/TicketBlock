import { updateProfileDetails } from './../controllers/auth-controller';
import { verifyUserAuth } from './../middleware/verify-auth';
import express, {Router} from 'express';
import { registerUser, verifyEmailAddress, login, verifyLoginMfa, forgotPassword, resetPassword, logout, getCurrentUser } from '../controllers/auth-controller'

const authRouter: Router = express.Router();
// Authentication Routes

authRouter.route('/register').post(registerUser as any)
authRouter.route('/verify-email').post(verifyEmailAddress as any)
authRouter.route('/login').post(login as any)
authRouter.route('/logout').get(logout as any);
authRouter.route('/forgot-password').post(forgotPassword as any);
authRouter.route('/reset-password').post(resetPassword as any);
authRouter.route('/me').get(verifyUserAuth as any, getCurrentUser as any);
authRouter.route('/verify-mfa').post(verifyLoginMfa as any)

authRouter.route('/update-profile').post(updateProfileDetails as any);

export default authRouter