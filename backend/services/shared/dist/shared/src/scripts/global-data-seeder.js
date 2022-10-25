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
const nft_model_1 = require("../../../nfts/src/models/nft-model");
const user_model_1 = require("../../../authentication/src/models/user-model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '/Users/sabin2000/Documents/ticketblock/backend/services/nfts/.env' });
const nft_schema_1 = __importDefault(require("../../../nfts/src/database/nft-schema"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Load NFT JSON File
const nfts = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../data/nfts.json')).toString());
const users = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../../../authentication/src/data/users.json')).toString());
(0, nft_schema_1.default)();
const loadData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalNftCount = yield getNftCount();
        const totalUsersCount = yield getUsersCount();
        if (totalNftCount === 0 && totalUsersCount === 0) {
            yield nft_model_1.Nft.create(nfts);
            yield user_model_1.User.create(users);
            console.log("Data loaded to DB...");
            return process.exit(1);
        }
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
const getUsersCount = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.countDocuments({});
});
const removeData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalNfts = yield getNftCount();
        const totalUsers = yield getUsersCount();
        if (totalNfts > 0 && totalUsers > 0) {
            yield nft_model_1.Nft.remove();
            yield user_model_1.User.remove();
            console.log("All the data removed from database..");
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
    loadData();
}
if (process.argv[2] === '--remove') {
    removeData();
}
