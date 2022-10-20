import express, {Router} from 'express';
import { registerUser, login, forgotPassword, resetPassword, logout, getCurrentUser } from '../controllers/auth-controller'

// Authentication Routes
const authRouter: Router = express.Router();

authRouter.route("/register").post(registerUser)

export default authRouter;