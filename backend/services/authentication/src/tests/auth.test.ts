import mongoose from "mongoose"
import request from "supertest";
require('dotenv').config("../.env")
import {app} from '../app';

beforeAll(async() => {
    // Connect to MongoDB database
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@ticketblock.erhl8xc.mongodb.net/?retryWrites=true&w=majority")
})

describe("Register Account - Test Suite", () => {


    it("Register Account - Missing Username", async () => {
        const bodyData = [{email: "sifojfs", password: "123mini123"}]

        for (const data of bodyData) {
            const response = await request(app).post("/api/v1/auth/register").send(data);

            return expect(response.statusCode).toBe(404);
        }

    })

    it("Register Account - Missing Password", async () => {
        const bodyData = [{email: "sifojfs"}]

        for (const data of bodyData) {
            const response = await request(app).post("/api/v1/auth/register").send(data);

            return expect(response.statusCode).toBe(404);
        }
    })

})

describe("Verify E-mail Address Test Suite", () => {


    it("Verify E-mail Address With Invalid Entries", async () => {
        const invalidOtpFields = [{userId: "", OTP: "09"}]

        for(const data of invalidOtpFields) {
            const response = await request(app).post("/api/v1/auth/verify-email").send(data);

            return expect(response.statusCode).toBe(404)
        }

    })

    it("Verify E-mail Address With Malformed User ID", async () => {
        const malformedInputs = [{userId: "5dfa", OTP: "909890"}]

        for(const data of malformedInputs) {
            const response = await request(app).post("/api/v1/auth/verify-email").send(data);

            return expect(response.statusCode).toBe(404)
        }

    })

    it("Verify E-mail Address With Missing User ID", async () => {
        const malformedInputs = [{OTP: "909890"}]

        for(const data of malformedInputs) {
            const response = await request(app).post("/api/v1/auth/verify-email").send(data);

            return expect(response.statusCode).toBe(404)
        }
    })



})


describe("Login - Test Suite", () => {

    it("Login Test - Invalid E-mail Address", async () => {
        const malformedInputs = [{email: "jfjehwfhew@gmail.com", password: "123mini123"}]

        for(const data of malformedInputs) {
            const response = await request(app).post("/api/v1/auth/login").send(data);

            return expect(response.statusCode).toBe(404)
        }
    })

    it("Login Test - Valid Data", async () => {
        const malformedInputs = [{email: "harun0@gmail.com", password: "123mini123"}]

        for(const data of malformedInputs) {
            const response = await request(app).post("/api/v1/auth/login").send(data);

            return expect(response.statusCode).toBe(200)
        }
    })  


})

describe("Verify Login MFA Test Suite", () => {

    it("Verify Login MFA - Valid Code", async () => {

    })

    it("Verify Login MFA - Missing Code", async () => {

    })

    it("Verify Login MFA - Invalid Code", async () => {

    })


})


describe("Forgot Password - Test Suite", () => {

    it("Forgot Password - Valid E-mail Address", async () => {

    })

    it("Forgot Password - Invalid E-mail Address", async () => {

    })

    it("Forgot Password - Missing E-mail Address", async () => {

    })


})

describe("Update Profile Details Test Suite", () => {

    
})

afterAll((done) => { // After all the tests run successfully, close the connection to the server
    mongoose.connection.close();

    done();
})