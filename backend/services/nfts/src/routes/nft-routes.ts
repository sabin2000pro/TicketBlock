import { verifyUserAuth } from './../../../authentication/src/middleware/verify-auth';
import express, { Router } from "express";
import { fetchAllNfts, fetchNftByID, createNewNft, deleteAllNfts, deleteNftByID } from "../controllers/nft-controller";

export const nftRoutes: Router = express.Router({mergeParams: true});

nftRoutes.route("/").get(verifyUserAuth as any, fetchAllNfts).post(verifyUserAuth as any, createNewNft).delete(verifyUserAuth as any, deleteAllNfts)
nftRoutes.route('/:id').get(fetchNftByID).delete(deleteNftByID)