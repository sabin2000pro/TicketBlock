import { BadRequestError, NotFoundError } from './../middleware/error-handler';
import { StatusCodes } from 'http-status-codes';
import {User} from '../models/user-model';
import {Request, Response, NextFunction} from 'express';
import { isValidObjectId } from 'mongoose';
import asyncHandler from 'express-async-handler';

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export interface IGetUserData extends Request {
    user: any | undefined;
}

export const registerUser = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    
        const {email, username, password, passwordConfirm} = request.body;
        const existingUser = await User.findOne({email});

        if(!email || !username || !password || !passwordConfirm) {
            return next(new NotFoundError("Some fields are missing. Please check again", StatusCodes.NOT_FOUND));
        }
    
        if(existingUser) {
            return next(new BadRequestError("User already exists", StatusCodes.BAD_REQUEST));
        }
    
        const user = await User.create({email, username, password, passwordConfirm});
        await user.save();

        const token = user.returnAuthToken();
        console.log(`Your JWT TOKEN : ${token}`);
    
        return response.status(StatusCodes.CREATED).json({success: true, userData: user, token});
    }
     

// @desc      Verify User's E-mail Address
// @route     POST /api/v1/auth/verify-email
// @access    Public (No Authorization Token Required)

export const verifyEmailAddress = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any | Response> => {
    const {ownerId, OTP} = request.body;

    if(!isValidObjectId(ownerId)) {

    }

    if(!OTP) {
        return next(new NotFoundError("No OTP found. Please check entry again", StatusCodes.NOT_FOUND));
    }

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

    const passwordsMatch = await user.compareLoginPasswords(password) as boolean;

    if(!passwordsMatch) {
        return next(new BadRequestError("Passwords do not match. Please try again", StatusCodes.BAD_REQUEST))
    }

    // Check if passwords match
    // Set the JWT token as a cookie
    const token = user.returnAuthToken();

    request.session = {token};

});

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const verifyLoginMfa = async(request: Request, response: Response, next: NextFunction): Promise<any> => {

}

// @desc      Logout User
// @route     GET /api/v1/auth/logout
// @access    Private (JWT Token Required)

export const logout = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any | Response> => {
    // Clear the session

    if(request.session !== null) {
        request.session = null;
    }

});

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const getCurrentUser = asyncHandler(async(request: IGetUserData, response: Response, next: NextFunction): Promise<any | Response> => {
    const user = request.user._id as IGetUserData;
    console.log(`User data ; ${user}`);

    return response.status(200).json({success: true, user});
});

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const forgotPassword = async(request: Request, response: Response, next: NextFunction): Promise<any> => {

}

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
    
}