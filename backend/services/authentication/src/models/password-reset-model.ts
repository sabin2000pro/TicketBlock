import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IPasswordReset {

}

interface IPasswordResetDocument extends mongoose.Model<IPasswordReset> {

}

const PasswordResetSchema = new mongoose.Schema<IPasswordResetDocument>({

})

const PasswordReset = mongoose.model<IPasswordResetDocument>("PasswordReset", PasswordResetSchema);
export {PasswordReset};
