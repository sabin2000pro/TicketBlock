import mongoose from "mongoose"
import request from "supertest";
require('dotenv').config("../.env")

import {app} from '../app';

beforeAll(async() => {
    // Connect to MongoDB database
})

afterAll((done) => { // After all the tests run successfully, close the connection to the server
    mongoose.connection.close();

    done();
})