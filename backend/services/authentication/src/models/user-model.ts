import express from 'express';
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

interface IUserAttributes {

}

interface IUserDocument extends mongoose.Model<IUserAttributes> {

}

const UserSchema = new mongoose.Schema<IUserDocument>({

});

const User = mongoose.model<IUserDocument>("User", UserSchema);