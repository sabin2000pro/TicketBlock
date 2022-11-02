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
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config("../.env");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Connect to MongoDB database
    return yield mongoose_1.default.connect("mongodb+srv://sabin2000:123mini123@ticketblock.erhl8xc.mongodb.net/?retryWrites=true&w=majority");
}));
describe("Register Account - Test Suite", () => {
    // Suite of tests
    it("Regiser Account - Invalid Details", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Register Account - Missing E-mail Address", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Register Account - Missing Username", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Register Account - Missing Password", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
});
describe("Verify E-mail Address Test Suite", () => {
    it("Verify E-mail Test - VALID OTP", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Verify E-mail Test - Invalid OTP", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Verify E-mail Test - Missing OTP OTP", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Verify E-mail Test - Missing User ID", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Verify E-mail Test - Invalid User ID", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
});
describe("Verify Login MFA Test Suite", () => {
    it("Verify Login MFA - Valid Code", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Verify Login MFA - Missing Code", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Verify Login MFA - Invalid Code", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
});
describe("Login - Test Suite", () => {
});
describe("Forgot Password - Test Suite", () => {
});
describe("Update Profile Details Test Suite", () => {
});
afterAll((done) => {
    mongoose_1.default.connection.close();
    done();
});
