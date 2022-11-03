import mongoose from "mongoose";

interface NftAttributes {
    tokenCreator: mongoose.Schema.Types.ObjectId;
    tokenId: number
    name: string | undefined;
    image: string | undefined
    price: string | undefined;
}

interface NftDocument extends mongoose.Model<NftAttributes> {
    tokenCreator: mongoose.Schema.Types.ObjectId;
    tokenId: number
    name: string | undefined;
    image: string | undefined
    price: string | undefined;

    fetchRareNfts: () => any
}

const NftSchema = new mongoose.Schema({

    tokenCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    tokenId: {
        type: Number,
        default: 0
    },

    name: {
        type: String,
        required: [true, "Please provide a valid NFT name"]
    },

    image: {
        type: String,
        default: 'no-photo.jpg'
    },

    price: {
        type: Number,
        required: true,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

}, {timestamps: true, toJSON: {virtuals: true}})

// @TODO
NftSchema.methods.fetchRareNfts = function() {

};

const Nft = mongoose.model<NftDocument>("Nft", NftSchema);
export {Nft}