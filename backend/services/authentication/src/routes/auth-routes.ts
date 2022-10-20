import express, {Router} from 'express';
import { registerUser, verifyEmailAddress, login, verifyLoginMfa, forgotPassword, resetPassword, logout, getCurrentUser } from '../controllers/auth-controller'

// Authentication Routes
const authRouter: Router = express.Router();

authRouter.route("/register").post(registerUser)
authRouter.route('/verify-email').post(verifyEmailAddress)
authRouter.route('/login').post(login)
authRouter.route('/verify-mfa').post(verifyLoginMfa)

export default authRouter;