import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path: '../../config.env'});

// Anonymous Function
export default () => {

    const connectNftSchema = async () => {

        try {

            // Conent to the NFT Schema
            return await mongoose.connect(process.env.DB_URI!).then(dbConn => {

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