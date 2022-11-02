import mongoose from "mongoose"
import request from "supertest";
require('dotenv').config("../.env")
import {app} from '../app';

beforeAll(async() => {
    // Connect to MongoDB database
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@ticketblock.erhl8xc.mongodb.net/?retryWrites=true&w=majority")
})

describe("Register Account - Test Suite", () => {

    // Suite of tests
    it("Regiser Account - Invalid Details", async () => {

    })

    it("Register Account - Missing E-mail Address", async () => {

    })

    it("Register Account - Missing Username", async () => {

    })

    it("Register Account - Missing Password", async () => {

    })


})

describe("Verify E-mail Address Test Suite", () => {

    it("Verify E-mail Test - VALID OTP", async () => {

    })

    it("Verify E-mail Test - Invalid OTP", async () => {

    })

    it("Verify E-mail Test - Missing OTP OTP", async () => {

    })

    it("Verify E-mail Test - Missing User ID", async () => {

    })

    it("Verify E-mail Test - Invalid User ID", async () => {

    })

})


describe("Login - Test Suite", () => {

    it("Login Test - Invalid E-mail Address", async () => {

    })

    it("Login Test - Invalid Password", async () => {

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