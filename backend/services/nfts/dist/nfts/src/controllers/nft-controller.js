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
const nft_error_handler_1 = require("../middlewares/nft-error-handler");
const http_status_codes_1 = require("http-status-codes");
const nft_model_1 = require("../models/nft-model");
const fetchAllNfts = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let query;
    const queryStr = request.query;
    const nfts = yield nft_model_1.Nft.find();
    const page = parseInt(request.query.page) || 1;
    const numberOfNfts = yield nft_model_1.Nft.countDocuments({});
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: nfts });
});
exports.fetchAllNfts = fetchAllNfts;
const fetchNftByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const nft = yield nft_model_1.Nft.findById(id);
    if (!nft) {
        return next(new nft_error_handler_1.NotFoundError("NFT Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: nft });
});
exports.fetchNftByID = fetchNftByID;
const createNewNft = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    const nft = yield nft_model_1.Nft.create(body);
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: nft });
});
exports.createNewNft = createNewNft;
const editNftByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    let nft = yield nft_model_1.Nft.findById(id);
    if (!nft) {
        return next(new nft_error_handler_1.NotFoundError("NFT with that ID not found on the server", 404));
    }
    nft = yield nft_model_1.Nft.findByIdAndUpdate(id, request.body, { new: true, runValidators: true });
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "All Nfts Here" });
});
exports.editNftByID = editNftByID;
const deleteAllNfts = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield nft_model_1.Nft.remove();
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "All Nfts Here" });
});
exports.deleteAllNfts = deleteAllNfts;
const deleteNftByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    yield nft_model_1.Nft.findByIdAndDelete(id);
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "NFT Deleted" });
});
exports.deleteNftByID = deleteNftByID;
const uploadNftImage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = request.files.file;
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "All Nfts Here" });
});
exports.uploadNftImage = uploadNftImage;
