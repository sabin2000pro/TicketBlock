import { BadRequestError } from './../middlewares/nft-error-handler';
import { NotFoundError } from '../middlewares/nft-error-handler';
import { StatusCodes } from 'http-status-codes';
import {Nft} from '../models/nft-model';
import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';

export const fetchAllNfts = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    let query;
    const queryStr = request.query;

    const nfts = await Nft.find();
    const page = parseInt(request.query.page as any) || 1;

    return response.status(StatusCodes.OK).json({success: true, data: nfts});
}

export const fetchNftByID = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    const id = request.params.id;
    const nft = await Nft.findById(id);

    if(!nft) {
        return next(new NotFoundError("NFT Not found", StatusCodes.NOT_FOUND));
    }
    
    return response.status(StatusCodes.OK).json({success: true, data: nft});
}

export const createNewNft = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    const body = request.body;
    const nft = await Nft.create(body);

    if(nft) {
        return next(new BadRequestError("NFT Already created on the backend", StatusCodes.BAD_REQUEST));
    }

    return response.status(StatusCodes.OK).json({success: true, data: nft});
}

export const editNftByID = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    const id = request.params.id;
    let nft = await Nft.findById(id);

    if(!nft) {
        return next(new NotFoundError("NFT with that ID not found on the server", 404));
    }

    nft = await Nft.findByIdAndUpdate(id, request.body, {new: true, runValidators: true});

    return response.status(StatusCodes.OK).json({success: true, message: "All Nfts Here"})
}

export const deleteAllNfts = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    await Nft.remove();
    return response.status(StatusCodes.OK).json({success: true, message: "All Nfts Here"})
}

export const deleteNftByID = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {

    const id = request.params.id;
    await Nft.findByIdAndDelete(id);

    
    return response.status(StatusCodes.OK).json({success: true, message: "NFT Deleted"})
}

export const uploadNftImage = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    const file = request.files!.file as unknown as UploadedFile | undefined;
   
    return response.status(StatusCodes.OK).json({success: true, message: "All Nfts Here"})
}
