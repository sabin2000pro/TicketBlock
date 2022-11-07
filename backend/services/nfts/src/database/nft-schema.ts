require('dotenv').config();
import mongoose from "mongoose";

// Anonymous Function
export default () => {

    const connectNftSchema = async () => {

        try {

            // Conent to the NFT Schema
            return await mongoose.connect("mongodb+srv://sabin2000:123mini123@ticketblock.erhl8xc.mongodb.net/?retryWrites=true&w=majority").then(dbConn => {

                if(dbConn.connection) {
                    console.log("Connected to NFT Schema")
                }

                if(!dbConn.connection) {
                    console.log("Could not connect to NFT schema")
                }

            })
        } 
        
        catch(err: any) {

            if(err) {
                return console.error(err.message);
            }
        }


    }

    connectNftSchema();

}