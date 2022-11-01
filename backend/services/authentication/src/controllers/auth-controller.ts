import { emailTransporter } from './../utils/send-email';
import { generateRandomResetPasswordToken } from './../utils/generate-reset-token';
import { BadRequestError, NotFoundError } from '../middleware/error-handler';
import { StatusCodes } from 'http-status-codes';
import {User} from '../models/user-model';
import {Request, Response, NextFunction} from 'express';
import { isValidObjectId } from 'mongoose';
import asyncHandler from 'express-async-handler';
import { PasswordReset } from "../models/password-reset-model";
import { TwoFactorVerification } from '../models/two-factor-verification-model';
import { EmailVerification } from '../models/email-verification-model';

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export interface IGetUserData extends Request {
    user: any | undefined;
}

export const registerUser = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    
       const {username, email, password} = request.body;
        const existingUser = await User.findOne({email});
    
        if(existingUser) {
            return next(new BadRequestError("User already exists", StatusCodes.BAD_REQUEST));
        }
    
        const user = await User.create({username, email, password});
        await user.save();

        return sendTokenResponse(request, user as any, StatusCodes.CREATED, response);
    }
     

// @desc      Verify User's E-mail Address
// @route     POST /api/v1/auth/verify-email
// @access    Public (No Authorization Token Required)

export const verifyEmailAddress = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any | Response> => {
    const {userId, OTP} = request.body;
    const user = await User.findById(userId);

    if(!user) {
        return next(new NotFoundError("Could not find that user", 404));
    }

    if(!OTP) {
        return next(new NotFoundError("No OTP found. Please check entry again", StatusCodes.NOT_FOUND));
    }

    const otpToken = await EmailVerification.findOne({owner: userId});

    if(!otpToken) {
        return next(new BadRequestError(`OTP Verification token is not found. Please try again`, StatusCodes.BAD_REQUEST));
    }

    // Check to see if tokens match



});

// @desc      Login User
// @route     POST /api/v1/auth/login
// @access    Public (No Authorization Token Required)

export const login = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any | Response> => {
    const {email, password} = request.body;

    if(!email || !password) {
        return next(new NotFoundError("E-mail or password not found. Please check again", StatusCodes.NOT_FOUND));
    }

    const user = await User.findOne({email});

    if(!user) {
        return next(new NotFoundError("Could not find that user", StatusCodes.NOT_FOUND));
    }

    const passwordsMatch = await user.compareLoginPasswords(password)

    if(!passwordsMatch) {
        return next(new BadRequestError("Passwords do not match. Please try again", StatusCodes.BAD_REQUEST))
    }
   
    return sendTokenResponse(request, user as any, StatusCodes.OK, response);

});

export const forgotPassword = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {email} = request.body;

    const user = await User.findOne({email});

    if(!user) {
        return next(new NotFoundError("No user found with that e-mail address", StatusCodes.NOT_FOUND));
    }

    const userHasResetToken = await PasswordReset.findOne({owner: user._id});

    // If the user already has the reset token
    if(userHasResetToken) {
        return next(new BadRequestError("You already have the reset password token. Try again later.", StatusCodes.BAD_REQUEST));
    }

    const token = generateRandomResetPasswordToken();

    if(token === undefined) {
        return next(new BadRequestError("Reset Password Token is invalid", StatusCodes.BAD_REQUEST));
    }

    const resetPasswordToken = await PasswordReset.create({owner: user._id, resetToken: token});
    await resetPasswordToken.save();

    const resetPasswordURL = `http://localhost:3000/auth/api/reset-password?token=${token}&id=${user._id}` // Create the reset password URL
    sendPasswordResetEmail(user, resetPasswordURL);

    return response.status(StatusCodes.OK).json({success: true, message: "Reset Password E-mail Sent", data: user});
}

const sendPasswordResetEmail = (user: any, resetPasswordURL: string) => {
     
     const transporter = emailTransporter();

        transporter.sendMail({

            from: 'resetpassword@ticketblock.com',
            to: user.email,
            subject: 'Reset Password',
            html: `
            
            <h1> ${resetPasswordURL}</h1>
            `

        })

}

export const verifyLoginMfa = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {userId, multiFactorToken} = request.body;
    const user = await User.findById(userId);

    if(isValidObjectId(userId)) {
        return next(new NotFoundError("User ID not valid", 404));
    }

    if(!multiFactorToken) {
        user.isActive = (!user.isActive);
        return next(new BadRequestError("Please provide your MFA token", StatusCodes.BAD_REQUEST));
    }

    const factorToken = await TwoFactorVerification.findOne({owner: userId})

    if(!factorToken) {
        return next(new BadRequestError("The token associated to the user is invalid", 400));
    }

    // Verify to see if the tokens match
    const mfaTokensMatch = factorToken.comapareMfaTokens(multiFactorToken);

    if(!mfaTokensMatch) {
        user.isActive = (!user.isActive) as boolean;
        user.isVerified = (!user.isVerified) as boolean;

        return next(new BadRequestError("The MFA token you entered is invalid. Try again", StatusCodes.BAD_REQUEST));
    }

    // Otherwise

    user.isActive = true;
    user.isVerified = true;

    factorToken.token = undefined;
    await user.save();

    return sendTokenResponse(request, user, 200, response);

}

// @desc      Logout User
// @route     GET /api/v1/auth/logout
// @access    Private (JWT Token Required)

export const logout = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any | Response> => {
    request.session = null
    return response.status(StatusCodes.OK).json({success: true, message: "You have logged out", data: {} })

});

// @desc      Get Currently Logged In User
// @route     GET /api/v1/auth/me
// @access    Private (Authorization Token Required)

export const getCurrentUser = async(request: IGetUserData, response: Response, next: NextFunction): Promise<any | Response> => {
    const user = request.user
    console.log(`User data ; ${user}`);

    return response.status(StatusCodes.OK).json({success: true, data: user});
};

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const resetPassword = asyncHandler(async(request: Request, response: Response, next: NextFunction): Promise<any> => {

});

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const updatePassword = async(request: Request, response: Response, next: NextFunction): Promise<any | Response> => {
    const currentPassword = request.body.currentPassword;
    const newPassword = request.body.newPassword;
}  

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const updateProfileDetails = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    const fieldsToUpdate = {email: request.body.email, username: request.body.username}
}

const sendTokenResponse = (request: Express.Request, user: any, statusCode: number, response: Response)=> {
    const token = user.returnAuthToken();
    request.session = {token};

    return response.status(statusCode).json({data: user, token});
}