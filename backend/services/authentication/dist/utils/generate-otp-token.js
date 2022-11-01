"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTPToken = void 0;
const generateOTPToken = (token_length = 6) => {
    let resetToken = '';
    let RANDOM_LENGTH = 9;
    for (let i = 1; i <= token_length; i++) {
        const randomToken = Math.round(Math.random() * RANDOM_LENGTH);
        resetToken += randomToken;
    }
    return resetToken;
};
exports.generateOTPToken = generateOTPToken;
