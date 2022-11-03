"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nft = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const NftSchema = new mongoose_1.default.Schema({
    tokenCreator: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    tokenId: {
        type: Number,
        default: 0
    },
    name: {
        type: String
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    price: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true, toJSON: { virtuals: true } });
// @TODO
NftSchema.methods.fetchRareNfts = function () {
};
const Nft = mongoose_1.default.model("Nft", NftSchema);
exports.Nft = Nft;
