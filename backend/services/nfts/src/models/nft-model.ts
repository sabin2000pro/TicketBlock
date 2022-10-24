import mongoose from "mongoose";

interface NftAttributes {
    tokenCreator: mongoose.Schema.Types.ObjectId;
    name: string | undefined;
    image: string | undefined
    tokenPrice: string | undefined;
    tokenConvertedPrice?: string | undefined;
    inStock: boolean | undefined;
    category: string | undefined;
    isRare: boolean | undefined;

    fetchRareNfts: () => any;
}

interface NftDocument extends mongoose.Model<NftAttributes> {
    tokenCreator: mongoose.Schema.Types.ObjectId;
    name: string | undefined;
    image: string | undefined
    tokenPrice: string | undefined;
    tokenConvertedPrice?: string | undefined;
    inStock: boolean | undefined;
    category: string | undefined;
    isRare: boolean | undefined;
    isListed: boolean | undefined;

    fetchRareNfts: () => any
}

const NftSchema = new mongoose.Schema({

    tokenCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    name: {
        type: String,
        required: [true, "Please provide a valid NFT name"]
    },

    image: {
        type: String,
        default: 'no-photo.jpg',
        required: [true, "Please upload a valid image for the NFT"]
    },

    price: {
        type: String,
        required: [true, "Please specify the price of the NFT in ETHER"]
    },

    tokenConvertedPrice: {
        type: String
    },

    inStock: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if the NFT is in stock or not"]
    },

    category: {
        type: String,
        required: [true, "Please specify the category that the NFT is in"],
        default: "tickets",
        enum: ["events", "tickets"]
    },

    isRare: {
        type: Boolean,
        default: false,
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