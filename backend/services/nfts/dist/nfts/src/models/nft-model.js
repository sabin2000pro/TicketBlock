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
    name: {
        type: String,
        required: [true, "Please provide a valid NFT name"]
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    price: {
        type: String,
        required: [true, "Please specify the price of the NFT in ETHER"]
    },
    tokenConvertedPrice: {
        type: String
    },
    inStock: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if the NFT is in stock or not"]
    },
    category: {
        type: String,
        required: [true, "Please specify the category that the NFT is in"],
        default: "ticket",
        enum: ["ticket"]
    },
    isRare: {
        type: Boolean,
        default: false,
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
