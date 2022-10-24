import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IPasswordReset {
    owner: mongoose.Schema.Types.ObjectId
    token: string;
    expiresAt: Date;
}

interface IPasswordResetDocument extends mongoose.Model<IPasswordReset> {
    owner: mongoose.Schema.Types.ObjectId
    token: string;
    createdAt: Date;
    expiresAt: Date;
}

const PasswordResetSchema = new mongoose.Schema<IPasswordResetDocument>({

    owner: { // Owner of the token
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    token: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    expiresAt: {
        type: Date,
        default: Date.now()
    }


}, {timestamps: true})

PasswordResetSchema.pre('save', async function(next) {
    let HASH_ROUNDS = 10;

    if(!this.isModified("token")) {
        return next();
    }

    this.token = await bcrypt.hash(this.token, HASH_ROUNDS);
    return next();
})  


const PasswordReset = mongoose.model<IPasswordResetDocument>("PasswordReset", PasswordResetSchema);
export {PasswordReset};
