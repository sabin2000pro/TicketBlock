import mongoose from "mongoose"
import request from "supertest";
require('dotenv').config("../.env")

import {app} from '../app';

beforeAll(async() => {
    // Connect to MongoDB database
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@ticketblock.erhl8xc.mongodb.net/?retryWrites=true&w=majority")
})

describe("Register Account - Test Suite", () => {
    it("Regiser Account - Invalid Details", async () => {

    })
})

describe("Login - Test Suite", () => {

})

describe("Forgot Password - Test Suite", () => {

})

afterAll((done) => { // After all the tests run successfully, close the connection to the server
    mongoose.connection.close();

    done();
})