"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "Please specify a username for the user"]
    },
    email: {
        type: String,
        required: [true, "Please specify a valid e-mail address for the user"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please specify valid password for the user"]
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
}, { toJSON: { virtuals: true }, timestamps: true });
// Hash User Password
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let HASH_ROUNDS = 10;
        if (!this.isModified("password")) {
            return next();
        }
        this.password = yield bcryptjs_1.default.hash(this.password, HASH_ROUNDS);
        return next();
    });
});
UserSchema.methods.compareLoginPasswords = function (providedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(providedPassword, this.password);
    });
};
UserSchema.methods.returnAuthToken = function () {
    return jsonwebtoken_1.default.sign({ _id: this._id }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_EXPIRES_IN });
};
const User = mongoose_1.default.model("User", UserSchema);
exports.User = User;
