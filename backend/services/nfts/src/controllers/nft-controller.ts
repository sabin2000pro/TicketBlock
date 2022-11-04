import { BadRequestError } from './../middlewares/nft-error-handler';
import { NotFoundError } from '../middlewares/nft-error-handler';
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
    const nft = await Nft.findById(id);

    if(!nft) {
        return next(new NotFoundError("NFT Not found", StatusCodes.NOT_FOUND));
    }
    
    return response.status(StatusCodes.OK).json({success: true, data: nft});
}

export const createNewNft = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    const body = request.body;
    const nft = await Nft.create(body);

    return response.status(StatusCodes.OK).json({success: true, data: nft});
}

export const editNftByID = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    const id = request.params.id;
    let nft = await Nft.findById(id);

    if(!nft) {
        return next(new NotFoundError("NFT with that ID not found on the server", 404));
    }

    nft = await Nft.findByIdAndUpdate(id, request.body, {new: true, runValidators: true});

    return response.status(StatusCodes.OK).json({success: true, data: nft})
}

export const deleteAllNfts = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    await Nft.deleteMany();
    return response.status(StatusCodes.OK).json({success: true, data: null })
}

export const deleteNftByID = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {

    const id = request.params.id;
    await Nft.findByIdAndDelete(id);

    return response.status(StatusCodes.OK).json({success: true, data: null})
}

export const uploadNftImage = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    const id = request.params.id;
    const file = request.files!.file as unknown as UploadedFile | undefined;
    const nft = await Nft.findById(id);

    if(!nft) {
        return next(new NotFoundError("NFT Not found with that ID", StatusCodes.NOT_FOUND));
    }

    if(!request.files) {
        return next(new BadRequestError(`Please ensure that the file is an actual image`, StatusCodes.BAD_REQUEST));
    }

    // 1. Ensure that the file is an actual image

    if(!file!.mimetype.startsWith("image")) {
        return next(new BadRequestError("Please make sure the uploaded file is an image", StatusCodes.BAD_REQUEST));
    }


   
    return response.status(StatusCodes.OK).json({success: true, message: "All Nfts Here"})
}
