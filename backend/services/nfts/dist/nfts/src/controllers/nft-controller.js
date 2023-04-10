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
exports.uploadNftImage = exports.deleteNftByID = exports.deleteAllNfts = exports.editNftByID = exports.createNewNft = exports.fetchNftByID = exports.fetchAllNfts = void 0;
const nft_error_handler_1 = require("./../middlewares/nft-error-handler");
const nft_error_handler_2 = require("../middlewares/nft-error-handler");
const http_status_codes_1 = require("http-status-codes");
const nft_model_1 = require("../models/nft-model");
const path_1 = __importDefault(require("path"));
const fetchAllNfts = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nfts = yield nft_model_1.Nft.find();
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: nfts });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, data: error.message });
        }
    }
});
exports.fetchAllNfts = fetchAllNfts;
const fetchNftByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenId = request.params.id;
        const nft = yield nft_model_1.Nft.findById(tokenId);
        if (!nft) {
            return next(new nft_error_handler_2.NotFoundError("NFT Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: nft });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, data: error.message });
        }
    }
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
        return next(new nft_error_handler_2.NotFoundError("NFT with that ID not found on the server", 404));
    }
    nft = yield nft_model_1.Nft.findByIdAndUpdate(id, request.body, { new: true, runValidators: true });
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: nft });
});
exports.editNftByID = editNftByID;
const deleteAllNfts = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield nft_model_1.Nft.deleteMany();
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: null });
});
exports.deleteAllNfts = deleteAllNfts;
const deleteNftByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    yield nft_model_1.Nft.findByIdAndDelete(id);
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: null });
});
exports.deleteNftByID = deleteNftByID;
const uploadNftImage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const fileReq = request.files.file;
    const nft = yield nft_model_1.Nft.findById(id);
    if (!nft) {
        return next(new nft_error_handler_2.NotFoundError("NFT Not found with that ID", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    if (!request.files) {
        return next(new nft_error_handler_1.BadRequestError(`Please upload a file`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // 1. Ensure that the file is an actual image
    if (!fileReq.mimetype.startsWith("image")) {
        return next(new nft_error_handler_1.BadRequestError("Please make sure the uploaded file is an image", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate File size. Check if file size exceeds the maximum size
    if (fileReq.size > process.env.MAX_FILE_UPLOAD_SIZE) {
        return next(new nft_error_handler_1.BadRequestError("File Size Too Large", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Create custom filename
    fileReq.name = `photo_${nft._id}${path_1.default.parse(fileReq.name).ext}`;
    fileReq.mv(`${process.env.FILE_UPLOAD_PATH}/${fileReq.name}`, (error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            return next(new nft_error_handler_1.BadRequestError("Problem with file upload", 500));
        }
        yield nft_model_1.Nft.findByIdAndUpdate(request.params.id, { image: fileReq.name }); // Update the NFT by its ID and add the respective file
        // Send the file to the upload path
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "File Uploaded" });
    }));
});
exports.uploadNftImage = uploadNftImage;
