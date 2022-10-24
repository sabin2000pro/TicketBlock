import { BadRequestError, NotFoundError } from './../middleware/error-handler';
import { StatusCodes } from 'http-status-codes';
import {User} from '../models/user-model';
import {Request, Response, NextFunction} from 'express';
import { isValidObjectId } from 'mongoose';

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export interface IGetUserData extends Request {
    user: any | undefined;
}

export const registerUser = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {

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
    
    catch(error: any) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message});
        }
    }



}

// @desc      Verify User's E-mail Address
// @route     POST /api/v1/auth/verify-email
// @access    Public (No Authorization Token Required)

export const verifyEmailAddress = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {ownerId, OTP} = request.body;
}

// @desc      Login User
// @route     POST /api/v1/auth/login
// @access    Public (No Authorization Token Required)

export const login = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {email, password} = request.body;
    
}

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const verifyLoginMfa = async(request: Request, response: Response, next: NextFunction): Promise<any> => {

}

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const logout = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    request.session = null
}

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const getCurrentUser = async(request: IGetUserData, response: Response, next: NextFunction): Promise<any> => {
    const user = request.user._id;
    console.log(`User data ; ${user}`);
}

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const forgotPassword = async(request: Request, response: Response, next: NextFunction): Promise<any> => {

}

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const resetPassword = async(request: Request, response: Response, next: NextFunction): Promise<any> => {

}

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const updatePassword = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    const currentPassword = request.body.currentPassword;
    const newPassword = request.body.newPassword;
}  

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const updateProfileDetails = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    
}