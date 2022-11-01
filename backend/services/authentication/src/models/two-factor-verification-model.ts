import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface ITwoFactorVerification {
    owner: mongoose.Schema.Types.ObjectId
    token: string;
    expiresAt: Date;
}

interface ITwoFactorVerificationDocument extends mongoose.Model<ITwoFactorVerification> {
    owner: mongoose.Schema.Types.ObjectId
    token: string;
    createdAt: Date;
    expiresAt: Date;
}

const TwoFactorVerificationSchema = new mongoose.Schema<ITwoFactorVerificationDocument>({

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

TwoFactorVerificationSchema.pre('save', async function(next) {
    let HASH_ROUNDS = 10;

    if(!this.isModified("token")) {
        return next();
    }

    this.token = await bcrypt.hash(this.token, HASH_ROUNDS);
    return next();
})  


const TwoFactorVerification = mongoose.model<ITwoFactorVerification>("TwoFactorVerification", TwoFactorVerificationSchema);
export {TwoFactorVerification};
