import jwt, { Secret, SignOptions } from "jsonwebtoken"
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

interface IUserAttributes {
    username: string;
    email: string;
    password: string;

    isVerified: boolean;
    isActive: boolean;

    nftsOwned: number; // Number of NFTs the user owns
    nftsMinted: number
    compareLoginPasswords: (enteredPassword: string | undefined) => Promise<boolean>
    returnAuthToken: () => any;
}

interface JwtPayloadInterface {
    payload: string | object;
    secret: Secret;
    options?: SignOptions;
}

interface IUserDocument extends mongoose.Model<IUserAttributes> {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;

    accountAddress: string;
    nftsOwned: number;

    isVerified: boolean;
    isActive: boolean;

    compareLoginPasswords: (enteredPassword: string | undefined) => Promise<boolean>
    returnAuthToken: () => JwtPayloadInterface
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

    // Stores the user's Meta Mask 20-byte address.
    accountAddress: {
        type: String,
        default: "0x2826f4846f107F6bE5Ef2Cc83221398594b50e97"
    },

    nftsOwned: { // The number of NFTs that this user owns. Once a user buys an NFT (invoke smart contract routine ) -> nftsOwned += 1; otherwise nftsOwned--;
        type: Number,
        default: 0
    },

    nftsMinted: {
        type: Number,
        default: 0
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isActive: {
        type: Boolean,
        default: false
    }


    
}, {toJSON: {virtuals: true}, timestamps: true});

// Hash User Password
UserSchema.pre("save", async function(next) {
    let HASH_ROUNDS = 10;

    if(!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, HASH_ROUNDS);
    return next();
})

UserSchema.methods.compareLoginPasswords = async function(providedPassword: string): Promise<boolean> {
    return await bcrypt.compare(providedPassword, this.password);
}

UserSchema.methods.returnAuthToken = function(): JwtPayloadInterface {
    return jwt.sign({_id: this._id}, process.env.JWT_TOKEN!, {expiresIn: process.env.JWT_EXPIRES_IN}) as unknown as JwtPayloadInterface;
};

const User = mongoose.model<IUserDocument>("User", UserSchema);
export {User} // Export the model