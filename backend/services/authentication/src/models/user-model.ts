import express from 'express';
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

interface IUserAttributes {
    username: string;
    email: string;
    password: string;
    role:string;
    nftsOwned: string;
}

interface IUserDocument extends mongoose.Model<IUserAttributes> {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    role: string;

    accountAddress: string;
    nftsOwned: number;
}

const UserSchema = new mongoose.Schema<IUserDocument>({ // User Schema
    username: { 
        type: String,
        required: [true, "Please specify a username for the user"]
    },

    email: {
        type: String,
        required: [true, "Please specify a valid e-mail address for the user"],
        unique: true
    },

    password: { // User password field
        type: String,
        required: [true, "Please specify valid password for the user"]
    },

    passwordConfirm: {
        type: String,
        required: [true, "Please confirm user password"]
    },

    role: {
        type: String,
        required: [true, "Please specify the role of the user"],
        default: 'user',
        enum: ["user", 'admin']
    },

    // Stores the user's Meta Mask 20-byte address.
    accountAddress: {
        type: String,
        default: "0x2826f4846f107F6bE5Ef2Cc83221398594b50e97"
    },

    nftsOwned: { // The number of NFTs that this user owns. Once a user buys an NFT (invoke smart contract routine ) -> nftsOwned += 1; otherwise nftsOwned--;
        type: Number,
        default: 0
    },

    
}, {toJSON: {virtuals: true}, timestamps: true});

// Hash User Password
UserSchema.pre("save", async function(next) {

    if(!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    return next();
})

const User = mongoose.model<IUserDocument>("User", UserSchema);
export {User} // Export the model