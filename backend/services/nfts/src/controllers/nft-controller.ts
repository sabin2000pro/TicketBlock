import { BadRequestError } from './../middlewares/nft-error-handler';
import { NotFoundError } from '../middlewares/nft-error-handler';
import { StatusCodes } from 'http-status-codes';
import {Nft} from '../models/nft-model';
import { Request, Response, NextFunction } from 'express';
import path from 'path';


export const fetchAllNfts = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
     const nfts = await Nft.find();
     return response.status(StatusCodes.OK).json({success: true, data: nfts});
}

export const fetchNftByID = async (request: Request, response: Response, next: NextFunction): Promise<Response | any> => {
    const tokenId = request.params.tokenId;
    const nft = await Nft.findById(tokenId);

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

export const uploadNftImage = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const id = request.params.id as any;
    const fileReq = request.files!.file as unknown as any;

    const nft = await Nft.findById(id);


    if(!nft) {
        return next(new NotFoundError("NFT Not found with that ID", StatusCodes.NOT_FOUND));
    }

    if(!request.files) {
        return next(new BadRequestError(`Please upload a file`, StatusCodes.BAD_REQUEST));
    }

    // 1. Ensure that the file is an actual image

    if(!fileReq.mimetype.startsWith("image")) {
        return next(new BadRequestError("Please make sure the uploaded file is an image", StatusCodes.BAD_REQUEST));
    }

    // Validate File size
    if(fileReq.size > process.env.MAX_FILE_UPLOAD_SIZE!) {
        return next(new BadRequestError("File Size Too Large", StatusCodes.BAD_REQUEST));
    }

     // Create custom filename
  fileReq.name = `photo_${nft._id}${path.parse(fileReq.name).ext}`;

  fileReq.mv(`${process.env.FILE_UPLOAD_PATH}/${fileReq.name}`, async (error: any) => {

        if(error) {
           return next(new BadRequestError("Problem with file upload", 500));
        }

        await Nft.findByIdAndUpdate(request.params.id, { image: fileReq.name }); // Update the NFT by its ID and add the respective file

        // Send the file to the upload path
        return response.status(StatusCodes.OK).json({success: true, message: "File Uploaded"})
  })

 
}