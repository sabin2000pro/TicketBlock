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
const nft_model_1 = require("../models/nft-model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '/Users/sabin2000/Documents/ticketblock/backend/services/nfts/.env' });
const nft_schema_1 = __importDefault(require("../database/nft-schema"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Load NFT JSON File
const nfts = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../data/nfts.json')).toString());
console.log(nfts);
(0, nft_schema_1.default)();
const loadNftData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalNftCount = yield getNftCount();
        console.log("Total NFT COunt", totalNftCount);
        // If there are no NFTs in the database
        yield nft_model_1.Nft.create(nfts);
        console.log("NFT Data loaded to DB...");
        return process.exit(1);
    }
    catch (err) {
        if (err) {
            return console.error(err);
        }
    }
});
const getNftCount = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield nft_model_1.Nft.countDocuments({});
});
const removeNftData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalNfts = yield getNftCount();
        if (totalNfts > 0) {
            yield nft_model_1.Nft.remove();
            console.log("All NFT Data removed from DB..");
            return process.exit(1);
        }
    }
    catch (err) {
        if (err) {
            return console.error(err);
        }
    }
});
// Handle Command Line Arguments
if (process.argv[2] === '--load') {
    loadNftData();
}
if (process.argv[2] === '--remove') {
    removeNftData();
}
//# sourceMappingURL=nft-data-seeder.js.map