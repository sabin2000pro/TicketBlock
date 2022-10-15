"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: {},
    email: {
        type: String,
        required: [true, "Please specify a valid e-mail address for the user"],
        unique: true
    },
    password: {
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
    nftsOwned: {
        type: Number,
        default: 0
    },
});
const User = mongoose_1.default.model("User", UserSchema);
exports.User = User;
//# sourceMappingURL=user-model.js.map