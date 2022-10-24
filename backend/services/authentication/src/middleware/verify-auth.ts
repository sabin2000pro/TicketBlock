import { StatusCodes } from 'http-status-codes';
import { UnauthorizedError } from './error-handler';
import { NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { User } from "../models/user-model";

// Bearer <token>

export interface IUserData {
    _id: string;
    email: string;
    username: string
}

export interface IRequestUser extends Request {
    user: IUserData
}

export type IAuthRequest = IRequestUser & {
    headers: {authorization: string}
}

export const verifyUserAuth = async (request: IAuthRequest, response: Response, next: NextFunction) => {

   try {

      let token;
      const authHeader = request.headers.authorization;

      if(!token) {
        return next(new UnauthorizedError("You are unauthorized to perform this action", StatusCodes.UNAUTHORIZED));
      }

      if(authHeader && authHeader.includes("Bearer ")) {
         token = authHeader.split(" ")[1]
      }

      const decoded: any = jwt.verify(token, process.env.JWT_TOKEN);
      request.user = await User.findById(decoded.id);

      return next();

   } 
   
   catch(err: any) {

    if(err) {
        return next(new UnauthorizedError("You are unauthorized to perform this action", StatusCodes.UNAUTHORIZED));
    }


   }
    
}