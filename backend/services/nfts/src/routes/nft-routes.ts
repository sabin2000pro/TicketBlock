import express, { Router } from "express";
import { fetchAllNfts, fetchNftByID } from "../controllers/nft-controller";

export const nftRoutes: Router = express.Router({mergeParams: true});

nftRoutes.route("/").get(fetchAllNfts)
nftRoutes.route('/:id').get(fetchNftByID);