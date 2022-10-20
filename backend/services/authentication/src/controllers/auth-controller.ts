import { StatusCodes } from 'http-status-codes';
import {User} from '../models/user-model';
import {Request, Response, NextFunction} from 'express';
import { isValidObjectId } from 'mongoose';

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const registerUser = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {email, username, password} = request.body;
    const existingUser = await User.findOne({email});

    const user = await User.create({email, username, password});
    await user.save();

    // Get JWT token and return it

    return response.status(StatusCodes.CREATED).json({success: true, userData: user});
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

}

// @desc      Register New User
// @route     POST /api/v1/auth/register
// @access    Public (No Authorization Token Required)

export const getCurrentUser = async(request: Request, response: Response, next: NextFunction): Promise<any> => {

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