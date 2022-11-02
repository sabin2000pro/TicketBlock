"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require('dotenv').config();
const cookie_session_1 = __importDefault(require("cookie-session"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const auth_schema_1 = __importDefault(require("./database/auth-schema"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
(0, auth_schema_1.default)();
const app = (0, express_1.default)();
exports.app = app;
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
if (process.env.NODE_ENV === 'production') {
    app.use((0, express_mongo_sanitize_1.default)()); // Prevent against NoSQL Injection attacks in production environment
}
// Used for slowing down requests
const rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.set('trust proxy', true);
app.use((0, express_fileupload_1.default)());
app.use((0, hpp_1.default)());
app.use((0, express_mongo_sanitize_1.default)()); // Used to prevent NoSQLI injections
app.use((0, cors_1.default)({
    origin: "*",
    methods: ['POST', "GET", "PUT", "DELETE"]
}));
app.use((0, helmet_1.default)());
app.use((0, cookie_session_1.default)({
    keys: ['session'],
    secure: process.env.NODE_ENV !== 'development'
}));
app.use(rateLimiter);
app.use('/api/v1/auth', auth_routes_1.default);
app.use(error_handler_1.default);
