import mongoose from "mongoose";

interface NftAttributes {
    owner: mongoose.Schema.Types.ObjectId;
}

interface NftDocument extends mongoose.Model<NftAttributes> {
    owner: mongoose.Schema.Types.ObjectId;
}

const NftSchema = new mongoose.Schema({

})

