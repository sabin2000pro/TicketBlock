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
const supertest_1 = __importDefault(require("supertest"));
require('dotenv').config("../.env");
const app_1 = require("../app");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Connect to MongoDB database
    return yield mongoose_1.default.connect("mongodb+srv://sabin2000:123mini123@ticketblock.erhl8xc.mongodb.net/?retryWrites=true&w=majority");
}));
describe("Register Account - Test Suite", () => {
    it("Register Account - Missing Username", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodyData = [{ email: "sifojfs", password: "123mini123" }];
        for (const data of bodyData) {
            const response = yield (0, supertest_1.default)(app_1.app).post("/api/v1/auth/register").send(data);
            return expect(response.statusCode).toBe(404);
        }
    }));
    it("Register Account - Missing Password", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodyData = [{ email: "sifojfs" }];
        for (const data of bodyData) {
            const response = yield (0, supertest_1.default)(app_1.app).post("/api/v1/auth/register").send(data);
            return expect(response.statusCode).toBe(404);
        }
    }));
});
describe("Verify E-mail Address Test Suite", () => {
    it("Verify E-mail Address With Invalid Entries", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidOtpFields = [{ userId: "", OTP: "09" }];
        for (const data of invalidOtpFields) {
            const response = yield (0, supertest_1.default)(app_1.app).post("/api/v1/auth/verify-email").send(data);
            return expect(response.statusCode).toBe(404);
        }
    }));
    it("Verify E-mail Address With Malformed User ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const malformedInputs = [{ userId: "5dfa", OTP: "909890" }];
        for (const data of malformedInputs) {
            const response = yield (0, supertest_1.default)(app_1.app).post("/api/v1/auth/verify-email").send(data);
            return expect(response.statusCode).toBe(400);
        }
    }));
    it("Verify E-mail Address With Missing User ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const malformedInputs = [{ OTP: "909890" }];
        for (const data of malformedInputs) {
            const response = yield (0, supertest_1.default)(app_1.app).post("/api/v1/auth/verify-email").send(data);
            return expect(response.statusCode).toBe(400);
        }
    }));
});
describe("Login - Test Suite", () => {
    it("Login Test - Invalid E-mail Address", () => __awaiter(void 0, void 0, void 0, function* () {
        const malformedInputs = [{ email: "jfjehwfhew@gmail.com", password: "123mini123" }];
        for (const data of malformedInputs) {
            const response = yield (0, supertest_1.default)(app_1.app).post("/api/v1/auth/login").send(data);
            return expect(response.statusCode).toBe(400);
        }
    }));
    it("Login Test - Valid Data", () => __awaiter(void 0, void 0, void 0, function* () {
        const malformedInputs = [{ email: "harun0@gmail.com", password: "123mini123" }];
        for (const data of malformedInputs) {
            const response = yield (0, supertest_1.default)(app_1.app).post("/api/v1/auth/login").send(data);
            return expect(response.statusCode).toBe(200);
        }
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
describe("Forgot Password - Test Suite", () => {
    it("Forgot Password - Valid E-mail Address", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Forgot Password - Invalid E-mail Address", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Forgot Password - Missing E-mail Address", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
});
describe("Update Profile Details Test Suite", () => {
});
afterAll((done) => {
    mongoose_1.default.connection.close();
    done();
});
