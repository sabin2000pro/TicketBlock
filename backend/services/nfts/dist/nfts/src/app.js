"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const nft_schema_1 = __importDefault(require("./database/nft-schema"));
const nft_routes_1 = require("./routes/nft-routes");
const app = (0, express_1.default)();
exports.app = app;
(0, nft_schema_1.default)();
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use(express_1.default.json());
app.set('trust proxy', true);
app.use((0, express_fileupload_1.default)());
app.use((0, hpp_1.default)());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use('/api/v1/nfts', nft_routes_1.nftRoutes);
app.get('/', (request, response, next) => {
    return response.status(200).json({ success: true, message: "NFT Root Route" });
});
