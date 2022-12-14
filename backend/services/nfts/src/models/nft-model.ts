import mongoose from "mongoose";

interface NftAttributes {
    tokenCreator: mongoose.Schema.Types.ObjectId;
    tokenId: number
    newNftOwner: string | undefined
    name: string | undefined;
    image: string | undefined
    price: string | undefined;
}

interface NftDocument extends mongoose.Model<NftAttributes> {
    tokenCreator: mongoose.Schema.Types.ObjectId;
    tokenId: number,
    newNftOwner: string | undefined;
    
    name: string | undefined;
    image: string | undefined
    price: string | undefined;

    fetchRareNfts: () => any
}

const NftSchema = new mongoose.Schema({

    tokenId: {
        type: Number,
        default: 0
    },

    creator: {
        type: String
    },

    newNftOwner: {
        type: String
    },

    name: {
        type: String
    },

    image: {
        type: String,
        default: 'no-photo.jpg'
    },

    price: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

}, {timestamps: true, toJSON: {virtuals: true}})


const Nft = mongoose.model<NftDocument>("Nft", NftSchema);
export {Nft}