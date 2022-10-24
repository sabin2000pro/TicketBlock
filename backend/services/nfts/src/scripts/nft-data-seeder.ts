import {Nft} from '../models/nft-model';
import connectNftSchema from '../database/nft-schema';
import fs from 'fs'
import path from 'path';

connectNftSchema();

// Load NFT JSON File
const nfts = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/nfts.json')).toString()) as unknown as string;

const loadNftData = async () => {
    try {

    } 
    
    catch(err: any) {

    }
}

const removeNftData = async () => {

    try {
        const totalNfts = await Nft.countDocuments({});

        if(totalNfts > 0) {
            await Nft.remove();
        }
       
    } 
    
    catch(err: any) {

    }


}

// Handle Command Line Arguments

if(process.argv[1] === '--load') {
    loadNftData();
}

if(process.argv[1] === '--remove') {
    removeNftData();
}