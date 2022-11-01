import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IEmailVerification {
    owner: mongoose.Schema.Types.ObjectId
    token: string;
    expiresAt: Date;

    compareOtpTokens: (enteredToken: string) => Promise<boolean>
}

interface IEmailVerificationDocument extends mongoose.Model<IEmailVerification> {
    owner: mongoose.Schema.Types.ObjectId
    token: string;
    createdAt: Date;
    expiresAt: Date;
}

const EmailVerificationSchema = new mongoose.Schema<IEmailVerificationDocument>({

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

EmailVerificationSchema.pre('save', async function(next) {
    let HASH_ROUNDS = 10;

    if(!this.isModified("token")) {
        return next();
    }

    this.token = await bcrypt.hash(this.token, HASH_ROUNDS);
    return next();
})  

EmailVerificationSchema.methods.compareOtpTokens = async function(enteredToken: string) {
    return await bcrypt.compare(enteredToken, this.token);
}


const EmailVerification = mongoose.model<IEmailVerificationDocument>("EmailVerification", EmailVerificationSchema);
export {EmailVerification};