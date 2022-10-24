require('dotenv').config();
import cookieSession from 'cookie-session';
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import cors from "cors";
import { errorHandler } from "./middleware/error-handler";
import mongoSanitize from 'express-mongo-sanitize';
import {authRouter} from './routes/auth-routes';
import connectAuthSchema from './database/auth-schema';

connectAuthSchema();

const app: Application = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if(process.env.NODE_ENV === 'production') {
    app.use(mongoSanitize()); // Prevent against NoSQL Injection attacks in production environment
}
 
app.use(express.json());
app.set('trust proxy', true);
app.use(hpp());
app.use(xss());
app.use(mongoSanitize()); // Used to prevent NoSQLI injections

app.use(cors({
    origin: "*",
    methods: ['POST', "GET", "PUT", "DELETE"]
}));

app.use(helmet());
app.use(cookieSession({
    keys: ['session']
}));

// Error Handler middleware
app.use('/api/v1/auth', authRouter);
app.use(errorHandler);

export {app}