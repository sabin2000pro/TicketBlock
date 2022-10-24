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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadNftImage = exports.deleteNftByID = exports.deleteAllNfts = exports.editNftByID = exports.createNewNft = exports.fetchNftByID = exports.fetchAllNfts = void 0;
const http_status_codes_1 = require("http-status-codes");
const nft_model_1 = require("../models/nft-model");
const fetchAllNfts = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const nfts = yield nft_model_1.Nft.find();
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: nfts });
});
exports.fetchAllNfts = fetchAllNfts;
const fetchNftByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    if (!id) {
    }
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "All Nfts Here" });
});
exports.fetchNftByID = fetchNftByID;
const createNewNft = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "All Nfts Here" });
});
exports.createNewNft = createNewNft;
const editNftByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "All Nfts Here" });
});
exports.editNftByID = editNftByID;
const deleteAllNfts = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "All Nfts Here" });
});
exports.deleteAllNfts = deleteAllNfts;
const deleteNftByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "All Nfts Here" });
});
exports.deleteNftByID = deleteNftByID;
const uploadNftImage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = request.files.file;
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "All Nfts Here" });
});
exports.uploadNftImage = uploadNftImage;
//# sourceMappingURL=nft-controller.js.map