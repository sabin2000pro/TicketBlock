require('dotenv').config();
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan"
import hpp from "hpp"
import helmet from "helmet"
import cors from "cors";
import connectNftSchema from './database/nft-schema';
import {nftRoutes} from './routes/nft-routes';

const app: Application = express();

connectNftSchema();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.set('trust proxy', true);

app.use(hpp());
app.use(cors());
app.use(helmet());

app.use('/api/v1/nfts', nftRoutes);

app.get('/', (request: Request, response: Response, next: NextFunction) => {
    return response.status(200).json({success: true, message: "NFT Root Route"})
})

export {app}