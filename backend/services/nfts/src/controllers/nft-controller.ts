import { StatusCodes } from 'http-status-codes';
import {Nft} from '../models/nft-model';
import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';

export const fetchAllNfts = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    const nfts = await Nft.find();
    return response.status(StatusCodes.OK).json({success: true, data: nfts});
}

export const fetchNftByID = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    const id = request.params.id;
    
    return response.status(StatusCodes.OK).json({success: true, message: "All Nfts Here"})
}

export const createNewNft = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "All Nfts Here"})
}

export const editNftByID = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "All Nfts Here"})
}

export const deleteAllNfts = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "All Nfts Here"})
}

export const deleteNftByID = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "All Nfts Here"})
}

export const uploadNftImage = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    const file = request.files!.file as unknown as UploadedFile | undefined;
   
    return response.status(StatusCodes.OK).json({success: true, message: "All Nfts Here"})
}
