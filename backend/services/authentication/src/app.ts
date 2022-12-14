require('dotenv').config();
import cookieSession from 'cookie-session';
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import cors from "cors";
import processErrors from './middleware/error-handler';
import mongoSanitize from 'express-mongo-sanitize';
import authRouter from './routes/auth-routes';
import connectAuthSchema from './database/auth-schema';
import rateLimit from 'express-rate-limit';
import fileUpload from 'express-fileupload';

connectAuthSchema();

const app: Application = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if(process.env.NODE_ENV === 'production') {
    app.use(mongoSanitize()); // Prevent against NoSQL Injection attacks in production environment
}

// Used for slowing down requests

const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes per request
	max: 100, 
	standardHeaders: true, 
	legacyHeaders: false,
})
 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('trust proxy', true);
app.use(fileUpload());
app.use(hpp());
app.use(mongoSanitize()); // Used to prevent NoSQLI injections

app.use(cors({
    origin: "*",
    methods: ['POST', "GET", "PUT", "DELETE"],
    credentials: true,
}));

app.use(helmet());

app.use(cookieSession({
    keys: ['session'],
    secure: process.env.NODE_ENV !== 'development'
}));

app.use(rateLimiter);

app.use('/api/v1/auth', authRouter); // Mount the auth routes as middleware 
app.use(processErrors);

export {app}