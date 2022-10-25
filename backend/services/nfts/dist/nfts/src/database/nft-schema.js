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
require('dotenv').config();
const mongoose_1 = __importDefault(require("mongoose"));
// Anonymous Function
exports.default = () => {
    const connectNftSchema = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Conent to the NFT Schema
            return yield mongoose_1.default.connect(process.env.DB_URI).then(dbConn => {
                if (dbConn.connection) {
                    console.log("Connected to NFT Schema");
                }
                if (!dbConn.connection) {
                    console.log("Could not connect to NFT schema");
                }
            });
        }
        catch (err) {
            if (err) {
                return console.error(err.message);
            }
        }
    });
    connectNftSchema();
};
