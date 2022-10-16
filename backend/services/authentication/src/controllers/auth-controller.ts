import {User} from '../models/user-model';
import express, {Request, Response, NextFunction} from 'express';
import { isValidObjectId } from 'mongoose';

export const registerUser = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {email, username, password} = request.body;
    const existingUser = await User.findOne({email});

    // If we have an existing user
    if(existingUser) {

    }

    const user = await User.create({email, username, password});
    await user.save();

    // Get JWT token and return it

    return response.status(201).json({success: true, userData: user});
}

export const verifyEmailAddress = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {ownerId, OTP} = request.body;

    if(!isValidObjectId(ownerId)) {

    }

    if(!OTP) { // If no OTP is entered throw an error

    }


}

export const login = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {email, password} = request.body;
}

export const verifyLoginMfa = async(request: Request, response: Response, next: NextFunction): Promise<any> => {

}

export const logout = async(request: Request, response: Response, next: NextFunction): Promise<any> => {

}

export const getCurrentUser = async(request: Request, response: Response, next: NextFunction): Promise<any> => {

}

export const forgotPassword = async(request: Request, response: Response, next: NextFunction): Promise<any> => {

}

export const resetPassword = async(request: Request, response: Response, next: NextFunction): Promise<any> => {

}

export const updatePassword = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    const currentPassword = request.body.currentPassword;
    const newPassword = request.body.newPassword;
}  

export const updateProfileDetails = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    
}