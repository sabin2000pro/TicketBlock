import { generateOTPToken } from './../utils/generate-otp-token';
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


const sendConfirmationEmail = (transporter: any, newUser: any, userOTP: number) => {

    return transporter.sendMail({
        from: 'verification@ethertix.com',
        to: newUser.email,
        subject: 'E-mail Verification',
        html: `
        
        <p>Your verification OTP</p>
        <h1> ${userOTP}</h1>
        `
    })
}

export const registerUser = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    
       const {username, email, password} = request.body;
        const existingUser = await User.findOne({email});
    
        if(existingUser) {
            return next(new BadRequestError("User already exists", StatusCodes.BAD_REQUEST));
        }
    
        const user = await User.create({username, email, password});
        
        await user.save();
        const currentUser = user._id; // Get the current user's ID
        const userOTP = generateOTPToken();

        const verificationToken = new EmailVerification({owner: currentUser, token: userOTP});
        await verificationToken.save();
    
        // Send e-mail verification to user
    
        const transporter = emailTransporter();
        sendConfirmationEmail(transporter, user, userOTP as unknown as any);
    
        const userOTPVerification = new EmailVerification({owner: user._id, token: userOTP});
        await userOTPVerification.save();

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

    // Check to see if tokens match
    const otpTokensMatch = otpToken.compareOtpTokens(OTP);

    if(!otpTokensMatch) {
        return next(new BadRequestError("OTP Tokens do not match. Please try again later", StatusCodes.BAD_REQUEST));
    }

    user.isVerified = true;

    await user.save();
    await EmailVerification.findByIdAndDelete(otpToken._id);

    // Send token

    return sendTokenResponse(request, user, 200, response);

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
    
    if(!user.isVerified) {
        return next(new BadRequestError("Account not verified. Please verify your account before logging in", 400 ));
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

export const lockAccount = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any | Response> => {
    return response.status(StatusCodes.OK).json({success: true, message: "Locked User Account" })

});

export const unlockAccount = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any | Response> => {
    return response.status(StatusCodes.OK).json({success: true, message: "Unlocked User Account" })
});

// @desc      Get Currently Logged In User
// @route     GET /api/v1/auth/me
// @access    Private (Authorization Token Required)

export const getCurrentUser = async(request: IGetUserData, response: Response, next: NextFunction): Promise<any | Response> => {
    const user = request.user
    return response.status(StatusCodes.OK).json({success: true, data: user});
};

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const resetPassword = asyncHandler(async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    const currentPassword = request.body.currentPassword;
    const newPassword = request.body.newPassword;
});

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const updatePassword = async(request: IGetUserData, response: Response, next: NextFunction): Promise<any | Response> => {
    const oldPassword = request.body.oldPassword;
    const newPassword = request.body.newPassword;

    const userId = request.user!._id;
    let user = await User.findById(userId);

    if(!user) {
        return next(new NotFoundError("User with that ID not found on the server ", StatusCodes.NOT_FOUND))
    }

    // Check if passwords match
    const oldPasswordMatch = await user.compareLoginPasswords(oldPassword);

    if(!oldPasswordMatch) {
       return next(new BadRequestError("Old password does not match", 400));
    }

    // Update Password fields
    user.password = newPassword;
    await user.save();

}  

// @desc      Update Profile Settings
// @route     POST /api/v1/auth/update-details
// @access    Public (No Authorization Token Required)

export const updateProfileDetails = async(request: IGetUserData, response: Response, next: NextFunction): Promise<any> => {
    const fieldsToUpdate = {email: request.body.email, username: request.body.username, password: request.body.password}
    const userId = request.user!._id;

    let user = await User.findById(userId);

    if(!user) {
        return next(new NotFoundError("User with that ID not found on the server ", StatusCodes.NOT_FOUND))
    }

    if(!fieldsToUpdate.email || !fieldsToUpdate.username) {
        return next(new BadRequestError("Missing fields, please check again", StatusCodes.BAD_REQUEST));
    }

    // Update the fields & save the data
    user = await User.findByIdAndUpdate(request.user!._id, fieldsToUpdate, {new: true, runValidators: false});

    user.username = fieldsToUpdate.username;
    user.email = fieldsToUpdate.email;

    await user.save();
    return response.status(StatusCodes.OK).json({success: true, data: user, message: "User Profile Updated"});
}

export const uploadUserAvatar = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: "User Avatar Uploaded"});
}

const sendTokenResponse = (request: Express.Request, user: any, statusCode: number, response: Response)=> {
    const token = user.returnAuthToken();
    request.session = {token};

    return response.status(statusCode).json({data: user, token});
}