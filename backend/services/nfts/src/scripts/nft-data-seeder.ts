import {Nft} from '../models/nft-model';
import connectNftSchema from '../database/nft-schema';
import fs from 'fs'
import path from 'path';

connectNftSchema();

// Load NFT JSON File
const nfts = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/nfts.json')).toString()) as unknown as string;

const loadNftData = async () => {
    try {

        const totalNftCount = await getNftCount();

        // If there are no NFTs in the database
        if(totalNftCount === 0) {
            await Nft.create(nfts);
            console.log("NFT Data loaded to DB...");
            
            return process.exit(1);
        }

        
    } 
    
    catch(err: any) {
        if(err) {
            return console.error(err);
        }
    }

}

const getNftCount = async () => {
    return await Nft.countDocuments({});
}

const removeNftData = async () => {

    try {
        const totalNfts = await getNftCount();

        if(totalNfts > 0) {
            
            await Nft.remove();

            console.log("All NFT Data removed from DB..");
            return process.exit(1);
        }

    } 
    
    catch(err: any) {
        if(err) {
            return console.error(err);
        }
    }


}

// Handle Command Line Arguments

if(process.argv[1] === '--load') {
    loadNftData();
}

if(process.argv[1] === '--remove') {
    removeNftData();
}