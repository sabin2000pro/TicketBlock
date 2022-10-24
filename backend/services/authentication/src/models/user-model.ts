import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

interface IUserAttributes {
    username: string;
    email: string;
    password: string;
    role: string;
    nftsOwned: string; // Number of NFTs the user owns
    compareLoginPasswords: (enteredPassword: string | undefined) => Promise<boolean>
}

interface IUserDocument extends mongoose.Model<IUserAttributes> {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    role: string;

    accountAddress: string;
    nftsOwned: number;

    compareLoginPasswords: (enteredPassword: string | undefined) => Promise<boolean>
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
    let HASH_ROUNDS = 10;

    if(!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, HASH_ROUNDS);
    this.passwordConfirm = await bcrypt.hash(this.passwordConfirm, HASH_ROUNDS);
    return next();
})

UserSchema.methods.compareLoginPasswords = async function(providedPassword: string): Promise<boolean> {
    return await bcrypt.compare(providedPassword, this.password);
}

UserSchema.methods.returnAuthToken = function(): any {
    return jwt.sign({_id: this._id}, process.env.JWT_TOKEN!, {expiresIn: process.env.JWT_EXPIRES_IN})
}

const User = mongoose.model<IUserDocument>("User", UserSchema);
export {User} // Export the model