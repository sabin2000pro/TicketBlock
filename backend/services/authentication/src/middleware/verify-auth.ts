import { NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { EnumDeclaration } from 'typescript';
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

      if(authHeader && authHeader.includes("Bearer ")) {
         token = authHeader.split(" ")[1]
      }

      const user = await User.findOne(request.user._id as unknown as IRequestUser);
      const decoded = jwt.verify(user._id, token);

   } 
   
   catch(err: any) {

   }
    
}
