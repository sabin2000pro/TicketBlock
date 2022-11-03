"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nftRoutes = void 0;
const express_1 = __importDefault(require("express"));
const nft_controller_1 = require("../controllers/nft-controller");
exports.nftRoutes = express_1.default.Router({ mergeParams: true });
exports.nftRoutes.route("/").get(nft_controller_1.fetchAllNfts).post(nft_controller_1.createNewNft).delete(nft_controller_1.deleteAllNfts);
exports.nftRoutes.route('/:id').get(nft_controller_1.fetchNftByID).delete(nft_controller_1.deleteNftByID);
exports.nftRoutes.route('/:upload').post(nft_controller_1.uploadNftImage);
