import express, { Router } from "express";
import { fetchAllNfts, fetchNftByID, createNewNft, deleteAllNfts, deleteNftByID } from "../controllers/nft-controller";

export const nftRoutes: Router = express.Router({mergeParams: true});

nftRoutes.route("/").get(fetchAllNfts).post(createNewNft).delete(deleteAllNfts)
nftRoutes.route('/:id').get(fetchNftByID).delete(deleteNftByID)