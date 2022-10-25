
import {Nft} from '../../../nfts/src/models/nft-model';
import {User} from '../../../authentication/src/models/user-model';
import dotenv from 'dotenv';
dotenv.config({path: '/Users/sabin2000/Documents/ticketblock/backend/services/nfts/.env'})
import connectNftSchema from '../../../nfts/src/database/nft-schema';
import fs from 'fs'
import path from 'path';

// Load NFT JSON File
const nfts = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/nfts.json')).toString()) as unknown as string;
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../authentication/src/data/users.json')).toString()) as unknown as string;

connectNftSchema();

const loadData = async () => {
    try {
        
        const totalNftCount = await getNftCount();
        const totalUsersCount = await getUsersCount();

        if(totalNftCount === 0 && totalUsersCount === 0) {

            await Nft.create(nfts);
            await User.create(users);

            console.log("Data loaded to DB...");
                
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

const getUsersCount = async () => {
    return await User.countDocuments({});
}

const removeData = async () => {

    try {
        const totalNfts = await getNftCount();
        const totalUsers = await getUsersCount();

        if(totalNfts > 0 && totalUsers > 0) {

            await Nft.remove();
            await User.remove();

            console.log("All the data removed from database..");
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

if(process.argv[2] === '--load') {
    loadData();
}

if(process.argv[2] === '--remove') {
    removeData();
}